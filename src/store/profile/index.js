import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      user: {},
      auth: localStorage.getItem("token") ? true : false,
      userDataLoading: false,
      error: null,
    };
  }

  /**
   * Получение данных пользователя по токену
   */
  async getUserData(mode) {
    this.setState({
      ...this.getState(),
      userDataLoading: true,
    }, 'сброс данных перед запросом пользователя');
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
      }, 'Установка данных пользователя');
    } catch (e) {
      localStorage.clear();
      this.setState({
        ...this.getState(),
        error: e,
        auth: false,
        userDataLoading: false,
        user: {},
      }, 'Ошибка во время запроса пользователя');
    }
  }
}

export default ProfileState;
