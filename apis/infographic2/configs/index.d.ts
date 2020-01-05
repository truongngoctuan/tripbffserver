export namespace InfographicConfig {
  type Background = {
    backgroundColor?: string;
  };

  type Infographic = {
    width: number;
    height?: number; //maybe just remove it
    blocks: Block[];
  } & Background;

  type Block = LocationBlock | BasicBlock;
  type BasicBlock =
    | ContainerBlock
    | ImageBlock
    | TextBlock
    | LocationImageBlock
    | LocationNameTextBlock
    | LocationFeelingTextBlock
    | LocationHightLightsTextBlock;

  type LocationBlock = {
    type: "location";
    blocks: BasicBlock[];
  };

  type LocationNameTextBlock = {
    type: "location-name-text";
  } & BaseTextBlock

  type LocationFeelingTextBlock = {
    type: "location-feeling-text";
  } & BaseTextBlock

  type LocationHightLightsTextBlock = {
    type: "location-high-lights-text";
  } & BaseTextBlock

  // todo not sure if this is the correct choice
  type ContainerBlock = {
    type: "container";
    blocks: BasicBlock[];
  } & StackPosition;

  type ImageBlock = {
    type: "image";
    url: string;
    // width: number;
    // height: number;
  } & RelativePosition;

  type BaseTextBlock = {
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    fontWeight?: string;
    textAnchor?: string;
    textTransform?: string;

  } & RelativePosition;

  type TextBlock = {
    type: "text";
    text: string;
  } & BaseTextBlock;

  type LocationImageBlock = {
    type: "location-image";
    width: number;
    height: number;
  };

  type StackPosition = {
    height: number;
  };

  type RelativePosition = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}
