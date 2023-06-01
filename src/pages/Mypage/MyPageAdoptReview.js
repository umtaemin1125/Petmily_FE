import styled from "styled-components";
import * as React from "react";
import {
  Grid,
  Pagination,
  ThemeProvider,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import * as S from "../../components/Support/Volunteer/VolunteerCard.styled";
import { useNavigate, useLocation } from "react-router-dom";

const MyPageAdoptReview = () => {
  const { userNum } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); // 페이지 수 계산

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let urlPage = Number(params.get("page"));

    if (urlPage < 1 || isNaN(urlPage)) {
      urlPage = 1;
      params.set("page", urlPage);
      navigate({ ...location, search: params.toString() }, { replace: true });
      return;
    }

    const requestParams = new URLSearchParams({ page: urlPage - 1 });
    if (userNum) {
      axios
        .get(`/mypage/adoptReview/${userNum}?${requestParams}`)
        .then((response) => {
          const totalPages = response.data.totalPages;
          if (urlPage > totalPages) {
            return;
          }
          setReviewData(response.data.content);
          setPageCount(totalPages);
          setPage(urlPage);
        })
        .catch((error) => {
          console.error("데이터 수신 오류 :", error);
        });

      window.scrollTo(0, 0);
    }
  }, [location, navigate, location.search, userNum]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!params.get("page")) {
      params.set("page", "1");

      navigate(
        {
          ...location,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  const handleChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);

    navigate(
      {
        ...location,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  if (reviewData.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          입양 후기
        </Typography>
        <Grid sx={{ width: "940px", height: "50vh" }}>
          <Table
            aria-label="caption table"
            overflow="hidden"
            sx={{ border: "1px solid lightgray" }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ height: 250 }}>
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          입양 후기
        </Typography>
        <CardGrid container spacing={4} sx={{ width: "940px" }}>
          {reviewData &&
            reviewData.map((item) => (
              <S.Container key={item.boardNum}>
                <Link
                  to={ADOPT.REVIEW_DETAIL(item.boardNum)}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                  state={{
                    boardNum: item.boardNum,
                    nickName: item.memberNickName,
                  }}
                >
                  <S.Thumbnail src={item.imgThumbnail} alt="thumbnail" />
                  <S.User>{item.reviewSubject}</S.User>
                  <S.Title>{item.memberNickName}</S.Title>
                  <S.Date>{item.reviewDate}</S.Date>
                  <S.CountWrapper>
                    <S.Count>조회수: {item.reviewCount}</S.Count>
                  </S.CountWrapper>
                </Link>
              </S.Container>
            ))}
        </CardGrid>
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          onChange={handleChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0 0px 0px",
          }}
        />
      </ThemeProvider>
    );
  }
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 95%;
  max-width: 940px;
  justify-items: center; // 변경된 부분
`;
export default MyPageAdoptReview;
