import React from "react";
import Text from "./Text";

type DetailCardProps = {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    rating: number;
    imageUrl: string;
};

const DetailCard: React.FC<DetailCardProps> = ({
    title,
    subtitle,
    address,
    hours,
    rating,
    imageUrl,

}) => {
    return (
        <div className="flex flex-col border-2 border-gray-300 rounded-2xl shadow-lg bg-[#F8F8F8] w-[880px] h-[208px] hover:border-[#9A77FF] transition-colors duration-200">
            <div className="flex p-6 gap-4">
                <div className="w-6 h-full flex flex-col items-center gap-2">
                    <img
                        src="/icons/Handle Desktop.svg"
                        alt="icon"
                        className="w-6 h-6 object-contain"
                    />
                </div>

                <div className="flex flex-col gap-2 w-[510px] h-[160px]">
                    <Text textStyle="heading1" className="font-bold truncate overflow-hidden whitespace-nowrap">
                        {title}
                    </Text>
                    <Text textStyle="headline2" className="text-[#9A77FF] truncate overflow-hidden whitespace-nowrap">
                        {subtitle}
                    </Text>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Location.svg" alt="address icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700">{address}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Clock.svg" alt="hours icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700">{hours}</Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src="/icons/Star.svg" alt="rating icon" className="w-5 h-5" />
                        <Text textStyle="body1" className="text-gray-700">{rating}</Text>
                    </div>
                </div>

                <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                    <img
                        src={imageUrl && imageUrl.trim() !== "" ? imageUrl : "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4"}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="w-6 h-full flex flex-col items-center gap-2">
                    <img
                        src="/icons/ReSet.svg"
                        alt="icon"
                        className="w-6 h-6 object-contain"
                    />
                </div>
            </div>

        </div >
    );
};

export default DetailCard;
