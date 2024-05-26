import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        AppBar: {
          title: "Air Ticket Application",
        },
        EnterAplication: {
          edit: "Edit Application",
          add: "Add New Application",
          submit: "Submit",
        },
        Search: {
          search: "Search",
        },
        PlaceHolder: {
          default: "Default",
          byDestination: "By destination",
          byDepartureDay: "By departure date",
        },
        destination: "Destination",
        flightNumber: "Flight number",
        passengerName: "Passenger name",
        departureDate: "Departure date",
      },
    },
    ua: {
      translation: {
        AppBar: {
          title: "Заявка квитків на авіарейси",
        },
        EnterAplication: {
          edit: "Редагувати заявку",
          add: "Додати нову заявку",
          submit: "Підтвердити",
        },
        Search: {
          search: "Пошук",
        },
        PlaceHolder: {
          default: "За замовчуванням",
          byDestination: "За місцем призначення",
          byDepartureDay: "За датою вильоту",
        },
        destination: "Місце призначення",
        flightNumber: "Номер рейсу",
        passengerName: "Ім'я пасажира",
        departureDate: "Дата вильоту",
      },
    },
  },
});

export default i18n;
