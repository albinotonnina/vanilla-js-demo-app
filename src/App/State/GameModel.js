export default {
  create(
    data = {
      name: "",
      short: "",
      url: "",
      tags: "",
      hasBoosters: ""
    }
  ) {
    return Object.create({
      getData() {
        return data;
      }
    });
  }
};
