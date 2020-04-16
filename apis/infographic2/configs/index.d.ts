import { InfographicRendererConfig } from "./index.renderer";

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
    positioning?: InfographicRendererConfig.RelativePositioning;
  } & InfographicRendererConfig.Background &
    InfographicRendererConfig.WidthHeight &
    InfographicRendererConfig.ContainerFlex &
    InfographicRendererConfig.Scalable;

  type TripNameTextBlock = {
    type: "text";
    text:
      | "{{trip.name}}"
      | "{{trip.info}}"
      | "{{location.name}}"
      | "{{location.feeling}}"
      | "{{location.hight-lights}}";
  } & InfographicRendererConfig.BaseTextBlock;

  type LocationsBlocks = {
    type: "locations";
    blocks: LocationBlock[];
  } & InfographicRendererConfig.ContainerFlex;

  type LocationBlock = {
    type: "location";
    blocks: TripBasicBlock[];
    positioning?: InfographicRendererConfig.RelativePositioning;
  } & InfographicRendererConfig.Background &
    InfographicRendererConfig.WidthHeight &
    InfographicRendererConfig.ContainerFlex;

  type LocationImageBlock = {
    type: "location-image";
    width: number;
    height: number;
    clipPath?: string;
    positioning?: InfographicRendererConfig.RelativePositioning;
    rotate?: number;
  };

  type Block = ContainerBlock | BasicBlock;

  type BasicBlock =
    | InfographicRendererConfig.ImageBlock
    | SvgBlock
    | InfographicRendererConfig.TextBlock
    | InfographicRendererConfig.LineBlock
    | InfographicRendererConfig.CircleBlock
    | InfographicRendererConfig.PathBlock;
  
  type ContainerBlock = {
    type: "container";
    blocks: Block[];
    positioning?: InfographicRendererConfig.RelativePositioning;
  } & InfographicRendererConfig.Background &
    InfographicRendererConfig.WidthHeight &
    InfographicRendererConfig.ContainerFlex;

  type SvgBlock = {
    type: "svg";
    url: string;
    shadowOffset?: { x: number; y: number };
    shadowBlur?: number;
    shadowColor?: string;
    positioning?: InfographicRendererConfig.RelativePositioning;
  };
}
