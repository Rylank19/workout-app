import React from "react";
import TagComponent from "./TagComponent";

interface Props {
  workoutTitle: string;
  day: string;
  dayIndex: number;
  color: number;
  onUpdate: (workout: string, day: number) => void;
}

// this function helps to memoize the function so that it doesn't change for the TagComponent (I think I can move this stuff into the Tag Component itself)
const MemoizedTag = ({ workoutTitle, day, dayIndex, color, onUpdate }: Props) => {
  const handleClick = React.useCallback(() => {
    onUpdate(workoutTitle, dayIndex);
  }, [workoutTitle, dayIndex, onUpdate]);

  return (
    <TagComponent name={day} startColor={color} onClick={handleClick} />
  );
};

export default React.memo(MemoizedTag, (prev, next) =>
  prev.workoutTitle === next.workoutTitle &&
  prev.day === next.day &&
  prev.dayIndex === next.dayIndex &&
  prev.color === next.color
); // only rerender if these specific props change
