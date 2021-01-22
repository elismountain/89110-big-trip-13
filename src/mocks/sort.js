export const generateSort = () => {
  return new Map([
    [`day`, {text: `Day`, checked: true, disabled: false}],
    [`event`, {text: `Event`, checked: false, disabled: true}],
    [`time`, {text: `Time`, checked: false, disabled: false}],
    [`price`, {text: `Price`, checked: false, disabled: false}],
    [`offer`, {text: `Offer`, checked: false, disabled: true}]
  ]);
};
