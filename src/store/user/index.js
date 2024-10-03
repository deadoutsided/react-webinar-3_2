import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      user: {},
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
      //запрос данных пользователя сразу после авторизации
      await this.getUserData();
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        auth: false,
      });
    }
  }

  /**
   * Получение данных пользователя по токену
   */
  async getUserData(mode) {
    this.setState({
      ...this.getState(),
      userDataLoading: true,
    });
    try {
      if (!localStorage.getItem("token")) {
        console.log("No token stored");
        throw new Error(mode === "No error" ? '' : "No token stored");
      }
      const res = await fetch(
        "api/v1/users/self?fields=_id, email, profile(name, phone)",
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
      const json = await res.json();
      this.setState({
        ...this.getState(),
        error: null,
        user: {
          _id: json.result._id,
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        },
        auth: true,
        userDataLoading: false,
      });
    } catch (e) {
      localStorage.clear();
      this.setState({
        ...this.getState(),
        error: e,
        auth: false,
        userDataLoading: false,
        user: {},
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

export default UserState;
