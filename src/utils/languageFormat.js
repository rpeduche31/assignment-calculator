export const languageFormat = (value) => {
  const language = navigator.language || 'en-US';
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });
  const newRegex = /\.\d*?(0*)$/;
  const match = String(value)?.match(newRegex);
  if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
  return formattedValue;
};
