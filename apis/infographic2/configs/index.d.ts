export namespace InfographicConfig {
  //for transformer to transform trip specific to something generic
  type TripInfographic = TripContainerBlock | LocationBlock;

  type TripBlock = LocationsBlocks | LocationBlock | TripBasicBlock;
  type TripBasicBlock =
    | TripContainerBlock
    | BasicBlock
    | TripNameTextBlock
    | LocationImageBlock;

  type TripContainerBlock = {
    type: "container";
    blocks: TripBlock[];
    positioning?: RelativePositioning;
  } & Background &
    WidthHeight &
    ContainerFlex;

  type TripNameTextBlock = {
    type: "text";
    text:
      | "{{trip.name}}"
      | "{{trip.info}}"
      | "{{location.name}}"
      | "{{location.feeling}}"
      | "{{location.hight-lights}}";
  } & BaseTextBlock;

  type LocationsBlocks = {
    type: "locations";
    blocks: LocationBlock[];
  } & ContainerFlex;

  type LocationBlock = {
    type: "location";
    blocks: TripBasicBlock[];
    positioning?: RelativePositioning;
  } & Background &
    WidthHeight &
    ContainerFlex;

  type LocationImageBlock = {
    type: "location-image";
    width: number;
    height: number;
    clipPath?: string;
    positioning?: RelativePositioning;
    rotate?: number;
  };

  // for renderer definition
  type Infographic = ContainerBlock;

  type Block = ContainerBlock | BasicBlock;
  type BasicBlock = ImageBlock | SvgBlock | TextBlock | LineBlock | CircleBlock | PathBlock;

  type ContainerBlock = {
    type: "container";
    blocks: Block[];
    positioning?: RelativePositioning;
  } & Background &
    WidthHeight &
    ContainerFlex;

  type ImageBlock = {
    type: "image";
    url: string;
    width?: number;
    height?: number;
    clipPath?: string;
    positioning: RelativePositioning;
    rotate?: number;
  };

  type SvgBlock = {
    type: "svg";
    url: string;
    shadowOffset?: {x: number; y: number };
    shadowBlur?: number;
    shadowColor?: string;
    positioning?: RelativePositioning;
  };

  type BaseTextBlock = {
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    fontWeight?: string;
    textAnchor?: "start" | "middle" | "end";
    textTransform?: string;
    positioning: RelativePositioning;
  };

  type TextBlock = {
    type: "text";
    text: string;
    width?: number;
  } & BaseTextBlock;

  type LineBlock = {
    type: "line";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeColor: string;
    strokeWidth: number;
  };

  type CircleBlock = {
    type: "circle";
    x: number;
    y: number;
    r: number;
    fillColor: string;
  };

  type PathBlock = {
    type: "path";
    path: string;
    fillColor: string;
  };

  //base types
  type RelativePositioning = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };

  type Background = {
    backgroundColor?: string;
  };
  type WidthHeight = {
    width?: number;
    height?: number;
  };
  type ContainerFlex = {
    flex?: "column" | "row";
  };
}
