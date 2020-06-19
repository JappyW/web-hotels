import React from "react";
import { MAX_FILE_SIZE_UPLOAD } from "../constants";
import {exportMessages} from "../constants";

export const logFormData = formData => {
  for (let pair of formData.entries()) {
    console.warn(pair[0] + ", " + pair[1]);
  }
};

export const getListOfFiles = arrayOfFiles => {
  return arrayOfFiles.map(file => (
    <li key={file.path} className="list-group-item d-flex justify-content-between">
      <span>{`${file.path} - ${file.size} bytes!`}</span>
      {(file.size > MAX_FILE_SIZE_UPLOAD) 
        ? <span className="text-danger">{exportMessages.FILE_TO_LARGE}</span> 
        : <span className="text-danger">{exportMessages.INVALID_DATA_TYPE}</span>}
    </li>
  ));
}

export const getBase64 = file => {
  const arr = [];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => { arr.push(reader.result)};
  return arr;
}

export const convertDataURLToFile = (dataurl, filename) => {
  try {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (err) {
    return err;
  }
};

export const replaceSpecificSymbols = string => {
  return string
    .replace(/\@/g, "%40")
    .replace(/\:/g, "%3A")
    .replace(/\$/g, "%24")
    .replace(/\,/g, "%2C")
    .replace(/\;/g, "%3B")
    .replace(/\+/g, "%2B")
    .replace(/\=/g, "%3D")
    .replace(/\?/g, "%3F")
    .replace(/\//g, "%2F")
    .replace(/\ /g, "%20");
};

export const mergeEqualArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    console.error("Not equal lengths of arrays!");
  }
  let result = [];

  arr1.forEach((element, index) => {
    result.push(element + arr2[index]);
  });
  return result;
};

export const createDateFromString = date => {
  return new Date(date);
};

export const createEmptyDateError = (firstdate, lastdate) => {
  if (firstdate === "" || lastdate === "") {
    return { error: "Empty Date Field Error" };
  }
};

export const isDateNegative = (firstdate, lastdate) => {
  return new Date(firstdate) - new Date(lastdate) >= 0;
};

export const createDateFromNow = day => {
  return new Date(new Date().setDate(new Date().getDate() + parseInt(day)))
    .toISOString()
    .slice(0, 10);
};

export const getOrderBadges = state => {
  return Object.entries(state)
    .map(([key, value]) => (
      <span className="badge badge-info mr-1 p-2" key={key}>
        {value}
      </span>
    ))
    .slice(0, 3);
};

export const getUniqueRoomTypes = data => {
  // return all room types
  const roomsTypeArray = data.rooms.map(room => room.room_type);
  const uniqueRoomsTypes = [];
  const map = new Map();

  // Get unique room type values
  for (const room of roomsTypeArray) {
    if (!map.has(room.id)) {
      map.set(room.id, true);
      uniqueRoomsTypes.push({
        id: room.id,
        name: room.name
      });
    }
  }
  return uniqueRoomsTypes;
};

export const getMainPhotoUrl = photos => {
  return photos[0].photo_url;
};

export const getArrayFromNumber = (number) => {
  return Array.from(
    Array(number),
    (x, index) => index + 1
  )
}

export const getCurrentYear = () => {
  return new Date().getFullYear();
}
