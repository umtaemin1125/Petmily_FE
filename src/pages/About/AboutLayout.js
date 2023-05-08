import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ABOUT } from "../../constants/PageURL";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { startTransition, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const AboutLayout = () => {
  const [title, setTitle] = useState("");
  // useEffect(() => console.log(setTitle));
  return (
    <>
      <AboutNav title={title} />
      <Outlet setTitle={setTitle} />
    </>
  );
};

const pages = [
  { title: "프로젝트 소개", link: ABOUT.ABOUT },
  { title: "입양 절차", link: ABOUT.ADOPT_PROCESS },
  { title: "활동 내역", link: ABOUT.ACTIVITY() },
  { title: "공지사항", link: ABOUT.NOTICE },
  { title: "자주 묻는 질문", link: ABOUT.FAQ },
];

const AboutNav = () => {
  const { pathname } = useLocation();
  const TabsRef = useRef();
  const [value, setValue] = useState(
    pages.find(
      (page) =>
        pathname === page.link ||
        (page.link !== ABOUT.ABOUT && pathname.includes(page.link))
    ).title
  );

  useEffect(() => {
    // pages.forEach((page) => {
    //   console.log(
    //     pathname,
    //     page.link,
    //     pathname === ABOUT.ABOUT,
    //     page.link !== ABOUT.ABOUT && pathname.includes(page.link)
    //   );
    // });
    // setValue(
    //   pages.find(
    //     (page) =>
    //       pathname === page.link ||
    //       (pathname !== ABOUT.ABOUT && pathname.includes(page.link))
    //   ).title
    // );
  }, [pathname]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box bgcolor={"#f8f8f8"} pt={10} pb={10}>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography
            fontSize={"3rem"}
            fontWeight={"bold"}
            borderBottom={"3px solid #fbd385"}
            width={"fit-content"}
          >
            {value}
          </Typography>
        </Box>
        <Box m={2}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            centered
            ref={TabsRef}
          >
            <LinkTab
              label="프로젝트 소개"
              value={"프로젝트 소개"}
              link={ABOUT.ABOUT}
            />
            <LinkTab
              label="입양 절차"
              value={"입양 절차"}
              link={ABOUT.ADOPT_PROCESS}
            />
            <LinkTab
              label="활동 내역"
              value={"활동 내역"}
              link={ABOUT.ACTIVITY()}
            />
            <LinkTab label="공지사항" value={"공지사항"} link={ABOUT.NOTICE} />
            <LinkTab
              label="자주 묻는 질문"
              value={"자주 묻는 질문"}
              link={ABOUT.FAQ}
            />
          </StyledTabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const StyledTabs = styled(Tabs)({
  ".MuiTab-root": {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#fbd385",
  },
  "& .Mui-selected": {
    color: "#fbd385 !important",
  },
});

function LinkTab(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    startTransition(() => {
      navigate(props.link);
    });
  };
  return <Tab onClick={handleClick} {...props} />;
}

export default AboutLayout;
