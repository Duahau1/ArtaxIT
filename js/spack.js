const url = "https://mcval.herokuapp.com/subscription/purchase";
paypal
  .Buttons({
    style: {
      shape: "pill",
      color: "gold",
      layout: "horizontal",
      label: "subscribe",
      tagline: false,
    },
    createSubscription: function (data, actions) {
      return actions.subscription.create({
        plan_id: "P-5BE31835A5336662JMBGVK6I",
      });
    },
    onApprove: function (data, actions) {
      let res = {
        subscriptionID: data.subscriptionID,
        planID: 3,
        planName: "carePro",
      };
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(res),
      })
        .then((res) => res.json())
        .then((value) => console.log(value));
    },
  })
  .render("#carePro-button-container");

paypal
  .Buttons({
    style: {
      shape: "pill",
      color: "gold",
      layout: "horizontal",
      label: "subscribe",
      tagline: false,
    },
    createSubscription: function (data, actions) {
      return actions.subscription.create({
        plan_id: "P-5DN69227AH7284217MBGVIUY",
      });
    },
    onApprove: function (data, actions) {
      let res = {
        subscriptionID: data.subscriptionID,
        planID: 2,
        planName: "carePlus",
      };
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(res),
      })
        .then((res) => res.json())
        .then((value) => console.log(value));
    },
  })
  .render("#carePlus-button-container");

paypal
  .Buttons({
    style: {
      shape: "pill",
      color: "gold",
      layout: "horizontal",
      label: "subscribe",
      tagline: false,
    },
    createSubscription: function (data, actions) {
      return actions.subscription.create({
        plan_id: "P-7MF19636042521849MBGVHTY",
      });
    },
    onApprove: function (data, actions) {
      let res = {
        subscriptionID: data.subscriptionID,
        planID: 1,
        planName: "careBasic",
      };
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(res),
      })
        .then((res) => res.json())
        .then((value) => console.log(value));
    },
  })
  .render("#careBasic-button-container");
