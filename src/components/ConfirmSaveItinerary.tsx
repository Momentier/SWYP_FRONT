// Check_Unchecked, Check_Checked를 COMMON_IMAGES에 추가 필요
import { useState } from "react";
import Text from "./Text";
import { COMMON_IMAGES } from "@/utils/imagePath";

interface ConfirmModalProps {
  initValue?: boolean;
  onChange: (value: boolean) => void;
  title: string;
}

export default function ConfirmSaveItinerary({
  initValue = false,
  onChange,
  title,
}: ConfirmModalProps) {
  const [checked, setChecked] = useState(initValue);

  const onChangeCheckbox = (value: boolean) => {
    onChange(value);
    setChecked(value);
  };

  return (
    <>
      <div className="p-5 bg-component-fill-alternative rounded-xl space-y-3">
        <Text as="p" textStyle="body1">
          {title}
        </Text>
      </div>
      <div className="mt-[38px]">
        <label className="flex items-center cursor-pointer mb-[4px]">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChangeCheckbox(e.target.checked)}
          />
          <span
            className="w-6 h-6 bg-cover bg-center mr-1"
            style={{
              backgroundImage: `url(${checked ? COMMON_IMAGES.CHECK_CHECKED : COMMON_IMAGES.CHECK_UNCHECKED})`,
            }}
          ></span>
          <Text as="span" textStyle="label1Reading">
            내 일정을 모두에게 공개할게요
          </Text>
        </label>
        <Text
          as="span"
          textStyle="label1Reading"
          className="text-semantic-label-alternative"
        >
          이름 등 개인정보는 공개되지 않으며, 체크 해제시 비공개로 저장됩니다.
        </Text>
      </div>
    </>
  );
}
