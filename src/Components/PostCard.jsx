import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import {
  convertTimestampToReadable,
  convertTimestampToReadableTime,
} from "./fuctions";
import parse from "html-react-parser";

function PostCard({
  $id,
  title,
  featuredimage,
  $createdAt,
  content,
  userName,
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="relative h-[80vh] md:w-full md:h-full flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-teal-100 p-2">
        {/* Badge for username */}
        <div className="absolute top-2 right-2 bg-teal-700 text-gray-50 text-sm font-bold px-4 py-2 rounded-full">
          {userName}
        </div>

        <div className="w-full justify-center mb-2">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="rounded-xl w-full h-full overflow-hidden object-cover object-center"
          />
        </div>

        <h2 className="text-xl font-semibold pb-2">{title}</h2>
        <div className="flex text-blue-900 justify-start items-start">
          <p>{convertTimestampToReadable($createdAt)}</p>
          <p className="pl-4">{convertTimestampToReadableTime($createdAt)}</p>
        </div>
        <div className="flex flex-col mb-2 py-2 px-1">
          <div className="w-full text-left">{parse(content)}</div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
