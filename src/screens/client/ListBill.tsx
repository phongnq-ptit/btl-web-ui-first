import { Alert, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BillItem from "../../components/BillItem";
import useBillApi from "../../hooks/useBillApi";
import { Bill, User } from "../../interface";
import { errorNotify } from "../../Notification";

const ListBill = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { getAllBillUser } = useBillApi();

  const [bills, setBills] = useState<Array<Bill>>([]);
  const [loadBill, setLoadBill] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getAllBillUser(user.role === "CLIENT" ? user.id : null)
        .then((response) => {
          if (response.data !== null) {
            setBills(response.data);
          } else {
            setBills([]);
          }
        })
        .catch((e) => errorNotify(e.message));
    }
    // eslint-disable-next-line
  }, [loadBill]);

  return (
    <React.Fragment>
      {user === null || bills.length === 0 ? (
        <Alert severity="info">Thông tin đơn hàng rỗng!</Alert>
      ) : (
        <Grid container spacing={2} width={"70%"} ml={35}>
          {bills.map((item) => (
            <Grid
              key={item.id}
              item
              xs={12}
              sx={{
                mt: 2,
                p: 2,
                borderBottom: "1px solid #ccc",
              }}
            >
              <BillItem
                props={{
                  billItem: item,
                  loadBill: loadBill,
                  setLoadBill: setLoadBill,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default ListBill;
