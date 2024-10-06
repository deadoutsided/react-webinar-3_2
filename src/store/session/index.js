import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      error: null,
      sessionDataLoading: false,
      auth: false,
    };
  }

  async checkAuth() {
    this.setState({
      ...this.getState(),
      sessionDataLoading: true,
    }, 'сброс данных перед запросом статуса авторизации');
    try {
      if (!localStorage.getItem("token")) {
        console.log("No token stored");
        throw new Error('No token')
      }
      const res = await fetch(
        "api/v1/users/self?fields=_id",
        {
          headers: {
            "X-Token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error.data.issues[0].message);
      }
      this.setState({
        ...this.getState(),
        error: null,
        auth: true,
        sessionDataLoading: false,
      }, 'Установка статуса авторизации пользователя');
    } catch (e) {
      localStorage.clear();
      this.setState({
        ...this.getState(),
        /* error: e, */
        auth: false,
        sessionDataLoading: false,
      }, 'Ошибка во время запроса "статуса авторизации(_id)" пользователя');
    }
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
        sessionDataLoading: true,
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
        sessionDataLoading: false,
      });

      localStorage.setItem("token", await json.result.token);
      await this.checkAuth();
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        sessionDataLoading: false,
      });
    }
  }

  /**
   * Запрос на удаление токена пользователя
   */
  async logout() {this.setState(
    {
      ...this.getState(),
      error: null,
      sessionDataLoading: true,
    },
    "Обновление данных перед запросом на выход с аккаунта"
  );
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
        sessionDataLoading: false,
      });
      await this.checkAuth();
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        sessionDataLoading: false,
      });
    }
  }

  clearErrorMessage(){
    this.setState({
      ...this.getState(),
      error: null
    }, 'Отчистка поля ошибки сессии')
  }
}

export default SessionState;
