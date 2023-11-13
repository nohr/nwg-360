import React, { useRef } from "react";
import { PanResponder, Animated } from "react-native";
import { state, view } from "@/constants/state";
import { Svg } from "react-native-svg";
import { useSnapshot } from "valtio";
import Shapes from "./Shapes";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Images from "./Images";

interface ViewerProps {
  width: number;
  height: number;
  rotationRatio?: number;
}

export default function Viewer({
  width,
  height,
  rotationRatio = 0.5,
}: ViewerProps) {
  const { assets, data } = useSnapshot(state);
  const { rotation } = useSnapshot(view);
  const rotatePeriod = 360 / assets.length;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
          view.startX = gestureState.moveX;
          view.startRotation = view.rotation;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
          updateRotation(gestureState.moveX);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
          updateRotation(gestureState.moveX);
        }
      },
    }),
  ).current;

  const updateRotation = (currentX: number) => {
    const deltaRotation =
      ((currentX - view.startX) * 180) / (rotationRatio * width);
    const newRotation = view.startRotation + deltaRotation;
    view.rotation = newRotation;
  };

  const getIndex = () => {
    const mRotation = rotation - Math.floor(rotation / 360) * 360;
    const index = Math.floor(mRotation / rotatePeriod);
    view.index = index;

    return index;
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        state.menu = !state.menu;
      }
    });

  const pinch = Gesture.Pinch().onChange((event) => {
    console.log(event);
  });

  // const pan = Gesture.Pan().onChange((event) => {
  //   console.log(event);
  // });

  const manipulation = Gesture.Exclusive(pinch, doubleTap);

  if (!data) return null;
  return (
    <GestureDetector gesture={manipulation}>
      <Animated.View
        {...panResponder.panHandlers}
        className={` h-full w-full`}
        shouldRasterizeIOS
      >
        <Svg
          preserveAspectRatio="xMinYMin slice"
          viewBox={`0 0 ${data.dimensions.width} ${data.dimensions.height}`}
          scale={view.scale}
          className={`h-full w-full`}
        >
          <Images getIndex={getIndex} />
          <Shapes width={width} height={height} />
        </Svg>
      </Animated.View>
    </GestureDetector>
  );
}
