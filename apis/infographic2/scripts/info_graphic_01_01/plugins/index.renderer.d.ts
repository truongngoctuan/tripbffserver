export namespace InfographicRendererConfig {  
  // for renderer definition
  type Infographic = ContainerBlock;

  type Block = ContainerBlock | BasicBlock;
  type BasicBlock =
    | ImageBlock
    | SvgBlock
    | TextBlock
    | LineBlock
    | CircleBlock
    | PathBlock;

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
    clipPath?: string;
    positioning: RelativePositioning;
    rotate?: number;
  } & WidthHeight;

  type SvgBlock = {
    type: "svg";
    url: string;
    shadowOffset?: { x: number; y: number };
    shadowBlur?: number;
    shadowColor?: string;
    positioning?: RelativePositioning;
    scale: number;
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
    numberOfLines?: number;
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
  type Scalable = {
    scale?: number;
  };
}
