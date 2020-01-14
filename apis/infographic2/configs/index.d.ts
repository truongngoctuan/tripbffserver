export namespace InfographicConfig {
  type Background = {
    backgroundColor?: string;
  };
  type WidthHeight = {
    width?: number;
    height?: number;
  };

  type Infographic = {
    width: number;
    height?: number; //maybe just remove it
    blocks: Block[];
  } & Background &
    ContainerBlock;

  type Block = LocationBlock | BasicBlock;
  type BasicBlock =
    | ContainerBlock
    | ImageBlock
    | TextBlock
    | TripNameTextBlock
    | TripInfoTextBlock
    | LocationImageBlock
    | LocationNameTextBlock
    | LocationFeelingTextBlock
    | LocationHightLightsTextBlock;

  type TripNameTextBlock = {
    type: "text";
    text: "{{trip.name}}";
  } & BaseTextBlock;

  type TripInfoTextBlock = {
    type: "text";
    text: "{{trip.info}}";
  } & BaseTextBlock;

  type LocationBlock = {
    type: "location";
    blocks: BasicBlock[];
    positioning?: Positioning;
  } & WidthHeight;

  type LocationNameTextBlock = {
    type: "text";
    text: "{{location.name}}";
  } & BaseTextBlock;

  type LocationFeelingTextBlock = {
    type: "text";
    text: "{{location.feeling}}";
  } & BaseTextBlock;

  type LocationHightLightsTextBlock = {
    type: "text";
    text: "{{location.hight-lights}}";
  } & BaseTextBlock;

  // todo not sure if this is the correct choice
  type ContainerBlock = {
    type: "container";
    blocks: Block[];
    positioning?: Positioning;
  } & Background & WidthHeight;

  type ImageBlock = {
    type: "image";
    url: string;
    // width: number;
    // height: number;
    positioning: Positioning;
  };

  type BaseTextBlock = {
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    fontWeight?: string;
    textAnchor?: string;
    textTransform?: string;
    positioning: Positioning;
  };

  type TextBlock = {
    type: "text";
    text: string;
    width?: number;
  } & BaseTextBlock;

  type LocationImageBlock = {
    type: "location-image";
    width: number;
    height: number;
    clipPath?: string;
    positioning?: Positioning;
  };

  type Positioning = {
    // width?: number;
    // height?: number;
  } & RelativePosition;
  
  // StackPosition | RelativePosition;

  type StackPosition = {
    width?: number;
    height: number;
  };

  type RelativePosition = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };

  // type Bounds = {
  //   top?: number;
  //   bottom?: number;
  //   left?: number;
  //   right?: number;
  //   width?: number;
  //   height: number;
  // }
}
