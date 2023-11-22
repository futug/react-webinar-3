/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.codeCounter = this.state.list.length; // Initial для генерации кодов записи
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Генерация уникального кода, сначала я сделал простой рандомайзер, который мапил в newCode, но: 1. Это не очень удовлетворяло условиям, так как при удалении кода, мог сгенерироваться этот же код заново,
     * 2. Так или иначе цифры получались огромные. Ввиду чего я просто ввел стартовую переменную, которая будет увеличиваться от числа длинны дефолтного стора, то есть новая запись будет 8 потом 9 итд. Но при удалении 9 следующая будет все таки 10, а не снова 9.
     */
    generateUniqueCode() {
        this.codeCounter++;
        return this.codeCounter;
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        const newCode = this.generateUniqueCode();
        this.setState({
            ...this.state,
            list: [...this.state.list, { code: newCode, title: "Новая запись" }],
        });
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter((item) => item.code !== code),
        });
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => {
                if (item.code !== code) {
                    item.selected = false;
                } else {
                    item.selected = !item.selected;
                    if (item.selected) {
                        item.selectionCount = (item.selectionCount || 0) + 1; // Если была выделена, то увеличиваем счетчик выделенных
                    }
                }
                return item;
            }),
        });
    }
}

export default Store;
