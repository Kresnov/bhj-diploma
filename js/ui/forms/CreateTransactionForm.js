/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }


  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accountsSelect = document.querySelector('.accounts-select');
    let text = '';

    Account.list({}, (err, response) => {
      if (response) {
        for (let i=0; i< response.data.length; i++) {
          let item = response.data[i];
          text += `<options value="${item.id}">${item.name}</options>`;
        }
        accountsSelect.innerHTML = text;
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response && (response.success === true)) {        
        this.element.reset();
        const type = options.data.type;
        const modalName = 'new' + type[0].toUpperCase() + type.substr(1);
        let transactionModal = App.getModal(modalName);
        transactionModal.close();
        App.update();        
      }
    })
  }
}
