import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useNavigate, useParams } from "react-router-dom";
import { BROWSER_PATH } from "../../constants/path";
import { MYPAGE } from "../../constants/PageURL";
import { useEffect, useState } from "react";

const MyPageOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState({
    orderNum: null,
    productName: null,
    cost: null,
    quantity: null,
    orderDate: null,
    orderState: null,
    productImg: null,
    address: null,
    note: null,
    recipient: null,
    recipientTel: null,
    postal: null,
    detailAddr: null,
  });
  const [payData, setPayData] = useState({
    paymentNum: null,
    orderNum: null,
    merchantUid: null, // 결제코드
    impUid: null, // 아임포트 uid
    paymentState: null,
    amount: null, // 결제금액
    paymentDate: null,
    paymentMethod: null,
  });

  useEffect(() => {
    setOrderData({
      ...orderlist.filter((data) => data.orderNum === parseInt(id))[0],
    });
    setPayData({
      ...payment.filter((data) => data.orderNum === parseInt(id))[0],
    });
  }, [id]);
  useEffect(() => {}, [orderData]);
  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="fbd385.main"
        mb={4}
      >
        주문 상세
      </Typography>
      <Box p={2} border={1} borderRadius={2} borderColor="fbd385.main">
        <Table size="small" padding="normal" sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...thSx, color: "#1976d2" }} colSpan={4}>
                {orderData.orderState}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={thSx} colSpan={4}>
                주문날짜: {orderData.orderDate}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width={"200px"}>
                <img
                  src={orderData.productImg}
                  alt="noImg"
                  height={"200px"}
                  onClick={() => navigate(BROWSER_PATH.MYPAGE)}
                />
              </TableCell>
              <TableCell sx={tdSx}>{orderData.productName}</TableCell>
              <TableCell sx={tdSx}>
                {parseInt(orderData.quantity).toLocaleString()} 개
              </TableCell>
              <TableCell sx={tdSx}>
                {parseInt(orderData.cost).toLocaleString()} 원
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={thSx} colSpan={4}>
                구매자 정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ ...tdSx, p: 2 }} colSpan={4}>
                이름: {member.name}
                <br />
                연락처: {member.tel}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={thSx} colSpan={4}>
                결제 정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ ...tdSx, p: 2 }} colSpan={4}>
                결제코드: {payData.merchantUid}
                <br />
                결제금액: {parseInt(payData.amount).toLocaleString()} 원
                <br />
                결제수단: {payData.paymentMethod}
                <br />
                결제일자: {payData.paymentDate}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={thSx} colSpan={4}>
                배송지 정보
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ ...tdSx, p: 2 }} colSpan={4}>
                수령인: {orderData.recipient}
                <br />
                연락처: {orderData.recipientTel}
                <br />
                우편번호: {orderData.postal}
                <br />
                주소: {orderData.address}
                <br />
                상세주소: {orderData.detailAddr}
                <br />
                배송 메모: {orderData.note}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="fbd385"
            sx={{ m: 2, width: "100px" }}
            onClick={() => navigate(MYPAGE.ORDERLIST)}
          >
            목록
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

const thSx = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
const tdSx = {
  fontSize: "1rem",
  fontWeight: 600,
};

const orderlist = [
  {
    orderNum: 5,
    productName: "유기농 강아지 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-30",
    orderState: "배송중",
    productImg: "/images/product.png",
    address: "서울특별시 강남구 선릉로 428",
    note: "문 앞에 두고가세요.",
    recipient: "이길까",
    recipientTel: "010-1111-2222",
    postal: 12345,
    detailAddr: "101-1001",
  },
  {
    orderNum: 4,
    productName: "저렴이 강아지 사료 5kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-30",
    orderState: "배송완료",
    productImg: "/images/product.png",
    address: "서울특별시 강남구 선릉로 428",
    note: "문 앞에 두고가세요.",
    recipient: "이길까",
    recipientTel: "010-1111-2222",
    postal: 12345,
    detailAddr: "101-1001",
  },
  {
    orderNum: 3,
    productName: "일반 강아지 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-29",
    orderState: "배송중",
    productImg: "/images/product.png",
    address: "서울특별시 강남구 선릉로 428",
    note: "문 앞에 두고가세요.",
    recipient: "이길까",
    recipientTel: "010-1111-2222",
    postal: 12345,
    detailAddr: "101-1001",
  },
  {
    orderNum: 2,
    productName: "일반 고양이 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-28",
    orderState: "배송중",
    productImg: "/images/product.png",
    address: "서울특별시 강남구 선릉로 428",
    note: "문 앞에 두고가세요.",
    recipient: "이길까",
    recipientTel: "010-1111-2222",
    postal: 12345,
    detailAddr: "101-1001",
  },
  {
    orderNum: 1,
    productName: "유기농 고양이 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-26",
    orderState: "배송중",
    productImg: "/images/product.png",
    address: "서울특별시 강남구 선릉로 428",
    note: "문 앞에 두고가세요.",
    recipient: "이길까",
    recipientTel: "010-1111-2222",
    postal: 12345,
    detailAddr: "101-1001",
  },
];

const payment = [
  {
    paymentNum: 1,
    orderNum: 1,
    merchantUid: "PAYMENT-V-1684205061665", // 결제코드
    impUid: "imp12345678", // 아임포트 uid
    paymentState: "결제완료",
    amount: 490000, // 결제금액
    paymentDate: "2023-04-30",
    paymentMethod: "계좌이체",
  },
  {
    paymentNum: 2,
    orderNum: 2,
    merchantUid: "PAYMENT-C-1684205061665", // 결제코드
    impUid: "imp12345678", // 아임포트 uid
    paymentState: "결제완료",
    amount: 490000, // 결제금액
    paymentDate: "2023-04-30",
    paymentMethod: "신용카드",
  },
  {
    paymentNum: 3,
    orderNum: 3,
    merchantUid: "PAYMENT-K-1684205061665", // 결제코드
    impUid: "imp12345678", // 아임포트 uid
    paymentState: "결제완료",
    amount: 490000, // 결제금액
    paymentDate: "2023-04-29",
    paymentMethod: "카카오페이",
  },
  {
    paymentNum: 4,
    orderNum: 4,
    merchantUid: "PAYMENT-V-1684205061665", // 결제코드
    impUid: "imp12345678", // 아임포트 uid
    paymentState: "결제완료",
    amount: 490000, // 결제금액
    paymentDate: "2023-04-28",
    paymentMethod: "계좌이체",
  },
  {
    paymentNum: 5,
    orderNum: 5,
    merchantUid: "PAYMENT-K-1684205061665", // 결제코드
    impUid: "imp12345678", // 아임포트 uid
    paymentState: "결제완료",
    amount: 490000, // 결제금액
    paymentDate: "2023-04-26",
    paymentMethod: "카카오페이",
  },
];

const member = {
  num: 1,
  id: "PetLove",
  pw: "12345678",
  nickname: "",
  email: "asdf@naver.com",
  name: "이기자",
  gender: "남자",
  birth: "2023-01-01",
  tel: "010-1234-5678",
  addr: "서울특별시 강남구 선릉로 428",
  img: "",
  role: "user",
};

export default MyPageOrderDetail;
