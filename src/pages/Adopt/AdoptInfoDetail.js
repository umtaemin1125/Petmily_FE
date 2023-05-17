import React from "react";
import { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Animal from "./Animal";
import axios from "axios";
const AdoptInfoDetail = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalIndex, setAnimalIndex] = useState(0);
  const [animallength, setAnimalLength] = useState("");
  const [displayData, setDisplayedData] = useState();
  const { name, code } = props;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230507&upr_cd=6110000&org_cd=${code}&pageNo=1&numOfRows=100&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json`
      );
      const data2 = response.data.response.body.items.item;

      const filteredData = data2.filter(
        (item) => item.processState === "보호중"
      );
      setData(filteredData);
      console.log("length" + filteredData.length);
      setAnimalLength(filteredData.length);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const moveLeft = useCallback(() => {
    setAnimalIndex((prevIndex) => {
      let newIndex = prevIndex - 5;
      if (newIndex < 0) {
        newIndex = data.length - Math.abs(newIndex);
      }
      const slicedData = data.slice(newIndex, newIndex + 5);
      setDisplayedData([...slicedData]);
      return newIndex;
    });
  }, [data]);

  const moveRight = useCallback(() => {
    setAnimalIndex((prevIndex) => {
      let newIndex = prevIndex + 5;
      if (newIndex >= data.length) {
        newIndex = newIndex - data.length;
      }
      const slicedData = data.slice(newIndex, newIndex + 5);
      setDisplayedData([...slicedData]);
      return newIndex;
    });
  }, [data]);

  const AnimalRender = () => {
    let result = [];

    console.log("data", data);

    for (let i = animalIndex; i < animalIndex + 5; i++) {
      let dataIndex = i;
      if (dataIndex >= data.length) {
        dataIndex = dataIndex % data.length;
      }
      let data1 = data[dataIndex];

      result.push(
        <Grid item xs={2} key={data1.desertionNo}>
          <Animal
            desertionNo={data1.desertionNo}
            filename={data1.filename}
            happenDt={data1.happenDt}
            happenPlace={data1.happenPlace}
            kindCd={data1.kindCd}
            colorCd={data1.colorCd}
            age={data1.age}
            weight={data1.weight}
            noticeNo={data1.noticeNo}
            noticeSdt={data1.noticeSdt}
            noticeEdt={data1.noticeEdt}
            profile={data1.popfile}
            processState={data1.processState}
            sexCd={data1.sexCd}
            neuterYn={data1.neuterYn}
            pecialMark={data1.pecialMark}
            careNm={data1.careNm}
            careTel={data1.careTel}
            careAddr={data1.careAddr}
            orgNm={data1.orgNm}
            chargeNm={data1.chargeNm}
            officetel={data1.officetel}
          />
        </Grid>
      );
    }
    return result;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2
        style={{
          marginTop: "0px",
          justifyContent: "center",
          marginLeft: "8.5%",
          color: "black",
          fontSize: "1.5em",
          width: "100px",
          backgroundColor: "#FBD385",
          textAlign: "center",
        }}
      >
        {name}
      </h2>
      <Grid
        container
        // spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Grid
          style={{
            display: "flex",
          }}
          item
          xs={1}
        >
          <IconButton
            onClick={moveLeft}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ArrowBackIosIcon
              style={{
                width: "30%",
                height: "100%",
                color: "black",
                scale: "2.0",
                marginLeft: "1.5em",
              }}
            />
          </IconButton>
        </Grid>

        {data?.length && AnimalRender()}

        <Grid item xs={1}>
          <IconButton
            onClick={moveRight}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ArrowForwardIosIcon
              style={{
                width: "30%",
                height: "100%",
                color: "black",
                scale: "2.0",
                marginRight: "1.5em",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdoptInfoDetail;