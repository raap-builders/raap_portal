import styled from "styled-components";
import React, {useState, useEffect} from "react";

const GlimmerLayout = require("../assets/GlimmerLayout.png");
const SparkLayout = require("../assets/SparkPhoto.png");
const BurstLayout = require("../assets/GlimmerPhoto.png");
const GlimmerPhoto = require("../assets/GlimmerPhoto.png");
const SparkPhoto = require("../assets/SparkPhoto.png");


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