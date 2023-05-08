import React from "react";
import { department_card } from "../public/_data/department_card";
import { useRouter } from "next/router";

function DepartmentCard() {
  const router = useRouter();
  return (
    <>
      {department_card.map((item) => (
        <article
          onClick={() => router.push(`${item.href}`)}
          className="bg-white border-2 border-gray-200 p-8 shadow-sm rounded grid text-center cursor-pointer"
          key={item.id}
        >
          <div className="flex gap-2 flex-col">
            <h2 className="font-sans text-2xl font-semibold text-gray-900">
              {item.title}
            </h2>
            <p className="font-sans tracking-wide text-xl text-gray-600 uppercase">
              {item.typeOfCard}
            </p>
          </div>
        </article>
      ))}
    </>
  );
}

export default DepartmentCard;
