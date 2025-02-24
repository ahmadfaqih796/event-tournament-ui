import moment from "moment";

export const formatDate = (date: string | null) => {
  return date ? moment(date).format("YYYY-MM-DD") : "-";
};
