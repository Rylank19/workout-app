import { Tag } from "@chakra-ui/react";
import React from "react";

const TagComponent = ({name, onClick, startColor} : {name: string, onClick: () => void, startColor : number}) => {
  console.log("rerendering tags as well")
  return (
    <Tag.Root justifyContent={"center"} minW={"10"} minH={"10"} asChild variant="solid" colorPalette={startColor > 0 ? "blue" : "gray"}>
      <button type="submit" onClick={onClick}>
        <Tag.Label>{name}</Tag.Label>
      </button>
    </Tag.Root>
  )
}

export default React.memo(TagComponent);