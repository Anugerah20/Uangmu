import { format } from "date-fns";

export const joinedAtDate = (joinedAt) => {
     if (joinedAt) {
          const date = new Date(joinedAt);
          return format(date, "dd/MMM/yyy");
     }

     return "-";
}
