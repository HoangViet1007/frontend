import qs from "query-string";

export const convertCurrency = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString("vi-vn", {
      style: "currency",
      currency: "vnd",
    });
  } else {
    return;
  }
};

export const convertToUnicode = (str) => {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/[đĐ]/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, "-");
  str = str.replace(/-+/g, "-");
  str = str.replace(/^-+|-+$/g, "");
  return str;
};

export const querySearch = (inputValue, queryStr, history) => {
  const queryOriginal = qs.parse(history.location.search);
  if (inputValue !== "") {
    const query = {
      ...queryOriginal,
      [queryStr]: inputValue,
    };
    history.push({
      search: qs.stringify(query, { encode: false }),
    });
  } else {
    const query = {
      ...queryOriginal,
      [queryStr]: "",
    };
    history.push({
      search: qs.stringify(query, { skipEmptyString: true }),
    });
  }
};
