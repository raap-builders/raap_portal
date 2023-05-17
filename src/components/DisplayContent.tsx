import styled from "styled-components";
import React, {useState, useEffect} from "react";

const GlimmerLayout = require("../assets/RoomLayout/pic2.png");
const SparkLayout = require("../assets/RoomLayout/pic3.png");
const BurstLayout = require("../assets/RoomLayout/pic4.png");
const GlimmerPhoto = require("../assets/RoomLayout/pic4.png");
const SparkPhoto = require("../assets/RoomLayout/pic3.png");


interface Props {
  finishType: string,
  layoutType: string
}

const PlaceholderImage = styled.img`
  height: 50vh;
  width: auto;
  object-fit: contain;
`

const DisplayContent = ({ finishType, layoutType }: Props) => {
  const [curImage, setCurImage] =  useState(GlimmerLayout)

  useEffect(()=>{
    // console.log("finishType, layoutType")
    // console.log(finishType, layoutType)
    if(finishType == "Glimmer"){
      if(layoutType == "Photo"){
        setCurImage(GlimmerPhoto)
      }
      if(layoutType == "Layout"){
        setCurImage(GlimmerLayout)
      }
    }
    if(finishType == "Spark"){
      if(layoutType == "Layout"){
        setCurImage(SparkLayout)
      }
      if(layoutType == "Photo"){
        setCurImage(SparkPhoto)
      }
    }
    if(finishType == "Burst"){
      setCurImage(BurstLayout)
    }
    
  }, [finishType, layoutType])

  return (
    <>
      <PlaceholderImage src={curImage}></PlaceholderImage>
    </>
  )
}

export default DisplayContent;