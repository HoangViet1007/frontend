import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../../assets/images/clinet/no-image.jpg";
const ListPT = ({ listPt }) => {
  return listPt?.map((pt) => {
    return (
      <div className="list-pt-item tw-relative" key={pt.id}>
        <div className="pt-image tw-overflow-hidden tw-h-[350px] sm:tw-h-[300px] sm:tw-pl-8">
          <Link
            className="tw-text-lg tw-text-black tw-font-semibold hover:tw-text-[#ff0000] tw-transition tw-duration-300"
            to={`/thong-tin-pt/${pt?.id}`}
          >
            <div className="tw-z-0 overlay-img tw-overflow-hidden tw-h-full tw-relative">
              <img
                className=" tw-h-full tw-w-full tw-object-contain tw-relative"
                src={pt.image}
                onError={(e) => {
                  e.target.src = noImage;
                }}
              />
              <div className="show-text tw-z-50 tw-w-[200px]">
                <div className="show-text-here">
                  <p>
                    Giới tính:{" "}
                    {pt?.sex === "Male"
                      ? "Nam"
                      : pt?.sex === "Female"
                      ? "Nữ"
                      : pt?.sex}
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    {pt?.address !== null && pt?.address.length >= 45
                      ? `${pt?.address.substring(0, 45)}...`
                      : pt?.address}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="pt-Coach tw-bg-white tw-absolute tw-left-[2px] tw-z-[3] tw-bottom-4 tw-py-3 tw-pl-8 tw-pr-5 tw-shadow tw-w-[235px] lg:tw-w-[210px] xl:tw-w-[235px]">
          <div className="coach-title tw-mb-1 tw-capitalize">
            {pt?.account_levels?.name}
          </div>
          <div className="name-pt">
            <Link
              className="tw-text-lg tw-text-black tw-font-semibold hover:tw-text-[#ff0000] tw-transition tw-duration-300"
              to={`/thong-tin-pt/${pt?.id}`}
            >
              {pt.name}
            </Link>
          </div>
        </div>
      </div>
    );
  });
};

export default ListPT;
