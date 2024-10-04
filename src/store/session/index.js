import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      auth: false,
      error: null,
      userDataLoading: true,
    };
  }

  /**
   * Получение токена
   * @param login логин введённый пользователем
   * @param password пароль введённый пользователем
   */
  async signin(login, password) {
    this.setState(
      {
        ...this.getState(),
        error: null,
        user: {},
        auth: false,
        userDataLoading: false,
      },
      "Обновление данных перед запросом на авторизацию"
    );

    try {
      const res = await fetch("api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error.data.issues[0].message);
      }
      const json = await res.json();
      this.setState({
        ...this.getState(),
        error: null,
        auth: true,
      });

      localStorage.setItem("token", await json.result.token);
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        auth: false,
      });
    }
  }

  /**
   * Запрос на удаление токена пользователя
   */
  async logout() {
    try {
      if (!localStorage.getItem("token")) {
        console.log("something gone wrong");
        throw new Error("something gone wrong");
      }
      const res = await fetch("api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error.data.issues[0].message);
      }
      localStorage.removeItem("token");
      this.setState({
        ...this.getState(),
        error: null,
        user: {},
        auth: false,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        auth: localStorage.getItem("token") ? true : false,
      });
    }
  }

  clearErrorMessage(){
    this.setState({
      ...this.getState(),
      error: null
    })
  }
}

export default SessionState;
