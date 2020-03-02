export namespace InfographicConfig {
  type Background = {
    backgroundColor?: string;
  };
  type WidthHeight = {
    width?: number;
    height?: number;
  };
  type ContainerFlex = {
    flex?: "column" | "row";
  }

  type Infographic = ContainerBlock | LocationBlock;

  type Block = LocationsBlocks | LocationBlock | BasicBlock;
  type BasicBlock =
    | ContainerBlock
    | ImageBlock
    | TextBlock
    | LineBlock
    | CircleBlock
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
  } & Background & WidthHeight & ContainerFlex;

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
  } & Background &
    WidthHeight & ContainerFlex;

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

  type LocationsBlocks = {
    type: "locations";
    blocks: LocationBlock[];
  } & ContainerFlex;

  type LocationImageBlock = {
    type: "location-image";
    width: number;
    height: number;
    url?: string;
    clipPath?: string;
    positioning?: Positioning;
  };

  type Positioning = {
    // width?: number;
    // height?: number;
  } & RelativePosition;

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
}

export namespace ProcessedInfographicConfig {

}