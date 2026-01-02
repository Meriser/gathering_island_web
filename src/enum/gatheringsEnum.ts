import type { OptionType } from "@/types/option";

// 聚會狀態 enum
export enum GatheringsStatusEnum {
  OPEN = "OPEN",         // 開放報名
  UPCOMING = "UPCOMING", // 即將開始
  CLOSED = "CLOSED",     // 已結束
}
// 聚會狀態選項
export const GatheringsStatusOptions: OptionType<GatheringsStatusEnum>[] = [
  { label: "開放報名", value: GatheringsStatusEnum.OPEN },
  { label: "即將開始", value: GatheringsStatusEnum.UPCOMING },
  { label: "已結束", value: GatheringsStatusEnum.CLOSED },
];

// 聚會類型 enum
export enum GatheringsTypeEnum {
  PARTY = "PARTY",           // 派對
  MUSIC = "MUSIC",           // 音樂
  LEARNING = "LEARNING",     // 學習
  EXHIBITION = "EXHIBITION", // 展覽
  TRAVEL = "TRAVEL",         // 旅遊
  SPORTS = "SPORTS",         // 運動
  GAME = "GAME",             // 遊戲
  FOOD = "FOOD",             // 美食
  OTHER = "OTHER",           // 其他
}
// 聚會類型選項
export const GatheringsTypeOptions: OptionType<GatheringsTypeEnum>[] = [
  { label: "派對", value: GatheringsTypeEnum.PARTY },
  { label: "音樂", value: GatheringsTypeEnum.MUSIC },
  { label: "學習", value: GatheringsTypeEnum.LEARNING },
  { label: "展覽", value: GatheringsTypeEnum.EXHIBITION },
  { label: "旅遊", value: GatheringsTypeEnum.TRAVEL },
  { label: "運動", value: GatheringsTypeEnum.SPORTS },
  { label: "遊戲", value: GatheringsTypeEnum.GAME },
  { label: "美食", value: GatheringsTypeEnum.FOOD },
  { label: "其他", value: GatheringsTypeEnum.OTHER },
];

// 聚會類型圖片路徑 enum
export enum GatheringsTypeImageEnum {
  PARTY = "/images/events/PARTY.jpg",           // 派對
  MUSIC = "/images/events/MUSIC.jpg",           // 音樂
  LEARNING = "/images/events/LEARNING.jpg",     // 學習
  EXHIBITION = "/images/events/EXHIBITION.jpg", // 展覽
  TRAVEL = "/images/events/TRAVEL.jpg",         // 旅遊
  SPORTS = "/images/events/SPORTS.jpg",         // 運動
  GAME = "/images/events/GAME.jpg",             // 遊戲
  FOOD = "/images/events/FOOD.jpg",             // 美食
  OTHER = "/images/events/OTHER.jpg",           // 其他
}