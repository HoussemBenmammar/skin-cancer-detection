/* eslint-disable dot-notation */
import React, { useEffect, useRef, useState, useContext } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ReactComponent as UploadIcon } from "../assets/icons/upload-icon.svg";
import { documentsIconsType } from "./__mock__/documentsIconsType";
import { ReactComponent as DocIcon } from "../assets/icons/doc_icon.svg";

function ImageUploader() {
  const [documents, setDocuments] = useState([]);
  const [isError, setIsError] = useState([]);
  const [Files, setFiles] = useState(null);
  // drag state
  const [dragActive, setDragActive] = React.useState(false);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      if (documents && documents.length !== 0) {
        setDocuments((prev) => [...prev, ...[...e.dataTransfer.files]]);
        setFiles((prev) => [...prev, ...[...e.dataTransfer.files]]);
      } else {
        setDocuments([...e.dataTransfer.files]);
        setFiles([...e.dataTransfer.files]);
      }
    }
  };

  const uploadRef = useRef();
  const viewRef = useRef();
  const uploadMoreRef = useRef();

  const handleChangeUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments(files);
    setFiles(files);
  };

  const handleAddMoreFiles = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prev) => [...prev, ...files]);
    setFiles((prev) => [...prev, ...files]);
  };

  function handleGetDocumentType(documentType) {
    return documentType.split(".").pop().toLowerCase();
  }

  function handleFormateDate(data) {
    const date = new Date(data);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  }

  function handleFormateSize(bytes, decimalPoint) {
    if (bytes === 0) return "0 Bytes";
    const k = 1000;
    const dm = decimalPoint || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  /** function to verify size of all files if is exceed 100mb */

  const isSizeDocumentsOver = (documentSize) => {
    let isTrue = true;
    // documentSize.forEach((item) => {
    //   if (item.size <= 100000 * 1024) return isTrue;
    //   isTrue = false;
    // });

    const result = documentSize.reduce((acc, item) => {
      acc += item.size;
      return acc;
    }, 0);

    if (result <= 100000 * 1024) return isTrue;
    isTrue = false;

    return isTrue;
  };

  /** function to verify each type of file if is accepted */

  const isTypeDocumentsOver = (documentType) => {
    let isTrue = true;
    // eslint-disable-next-line consistent-return
    documentType.forEach((item) => {
      if (
        item.name.split(".").pop().toLowerCase() === "png" ||
        item.name.split(".").pop().toLowerCase() === "jpg" ||
        item.name.split(".").pop().toLowerCase() === "jpeg"
      )
        return isTrue;
      isTrue = false;
    });

    return isTrue;
  };

  /* get if extention exist in mock extention icons */
  const isExtentionExist = (itemFile) => {
    const result = false;
    const itemFind = documentsIconsType.find(
      (itemIcon) => itemIcon.name === handleGetDocumentType(itemFile.name)
    );

    if (itemFind) return true;
    return result;
  };

  /* Get extention icon and show it in component */
  const getExtentionIcon = (itemType) => {
    const result = documentsIconsType.map((documentIcon) => {
      if (handleGetDocumentType(itemType.name) === documentIcon.name) {
        return (
          <documentIcon.icon
            key={documentIcon.id}
            width={35}
            height={35}
            className="fill-[#6F6C90]"
          />
        );
      }

      return null;
    });

    return result;
  };

  /**
   * this useEffect run when upload documents
   * check if accepted type of document is uploaded
   */

  useEffect(() => {
    if (documents) {
      if (isSizeDocumentsOver(documents) && isTypeDocumentsOver(documents)) {
        setIsError((prev) => ({ ...prev, file: "" }));
      } else
        setIsError((prev) => ({
          ...prev,
          file: "Please upload file with type : JPG, JPEG, PNG file do not exceed 10mb",
        }));
    }
  }, [documents, setIsError]);

  return (
    <>
      <div
        className={`section-content flex flex-col relative pt-10 justify-center items-center w-full h-full bg-gray-50 rounded-lg border ${
          dragActive ? "opacity-25" : ""
        } ${
          // eslint-disable-next-line no-nested-ternary
          documents && documents.length !== 0 && !isError.file
            ? "border border-[#4E60FF]"
            : isError.file
            ? "border border-errorColor"
            : "border-dashed border-[#A0AEC0]"
        } cursor-pointer hover:border-[#4E60FF] `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* icon X to remove files states */}
        {documents && documents.length !== 0 && (
          <XMarkIcon
            width={30}
            height={30}
            className="absolute top-2 right-2 fill-primaryblack hover:fill-primary"
            onClick={() => {
              setDocuments(null);
              setFiles(null);
              setIsError((prev) => ({ ...prev, file: "" }));
            }}
          />
        )}
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col relative py-10 justify-center items-center w-full h-full cursor-pointer hover:border-[#4E60FF] bg-gray-50 rounded-lg `}
        >
          {documents && documents.length !== 0 && !isError.file ? (
            <div
              onClick={() => viewRef.current.click()}
              className="sec-files-view w-full h-full grid grid-cols-3 gap-4 overflow-x-hidden"
            >
              {documents.map((item) => (
                <div
                  key={item.name}
                  className="w-full flex flex-row items-center justify-start gap-2 ml-4 overflow-x-hidden"
                >
                  <div className="flex items-center">
                    {isExtentionExist(item) ? (
                      getExtentionIcon(item)
                    ) : (
                      <DocIcon
                        width={35}
                        height={35}
                        className="fill-[#6F6C90]"
                      />
                    )}
                  </div>
                  <div className="sec-title truncate">
                    <h3
                      title={item.name}
                      className="font-bold text-md text-[#2D3748] truncate"
                    >
                      {item.name}
                    </h3>
                    <p className="font-normal text-xs text-[#A0AEC0]">
                      {handleFormateDate(item.lastModified)},{" "}
                      {handleFormateSize(item.size)}
                    </p>
                  </div>
                </div>
              ))}
              <input
                ref={viewRef}
                id="dropzone-file"
                type="file"
                name="view-input"
                className="hidden"
                multiple
                onChange={handleChangeUpload}
              />
            </div>
          ) : (
            <>
              {" "}
              <div
                onClick={() => uploadRef.current.click()}
                className="w-full h-full flex flex-col justify-center items-center hover:cursor-pointer"
              >
                <div className="section-icon w-full h-1/2 flex flex-col justify-center items-center pt-4">
                  <UploadIcon
                    stroke="#cecece"
                    fill="#cecece"
                    width={50}
                    height={50}
                  />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>

                {!Files && (
                  <div className="text-description w-full h-auto flex flex-row items-center justify-center gap-10 my-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      JPG, JPEG, PNG (file do not exceed 100mb)
                    </p>
                  </div>
                )}
                <div className="sec-item w-full h-2/3 grid grid-cols-3 justify-center items-center gap-10 my-4 px-4">
                  {Files &&
                    Files.map((item, idx) => (
                      <div
                        key={idx}
                        className="sec-title flex flex-row gap-2 truncate"
                      >
                        <div className="flex items-center">
                          {isExtentionExist(item) ? (
                            getExtentionIcon(item)
                          ) : (
                            <DocIcon
                              width={35}
                              height={35}
                              className="fill-[#6F6C90]"
                            />
                          )}
                        </div>
                        <div className="sec-info">
                          <h3
                            title={item.name}
                            className="font-semibold text-sm text-primaryblack truncate"
                          >
                            {item.name}
                          </h3>
                          <p className="font-normal text-xs text-[#A0AEC0] my-1">
                            {handleFormateDate(item.lastModified)},{" "}
                            {handleFormateSize(item.size)}
                          </p>
                          <p className="font-normal text-xs text-[#A0AEC0] my-1">
                            {item.name.split(".").pop()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <input
                  ref={uploadRef}
                  id="upload-file"
                  type="file"
                  name="upload-input"
                  className="hidden"
                  multiple
                  onChange={handleChangeUpload}
                />
              </div>
            </>
          )}
        </label>
        {/* {documents && documents.length !== 0 && !isError.file && (
          <div
            onClick={() => uploadMoreRef.current.click()}
            className="add-more-files w-2/3 h-12 flex items-center justify-center rounded-full group border border-dashed border-secondGray mt-10 mb-6 hover:bg-primary z-20"
          >
            <div className="main-text w-full h-full flex flex-col items-center justify-center">
              <PlusIcon
                width={22}
                height={22}
                className="fill-secondGray group-hover:fill-white"
              />
              <h4 className="font-popins font-normal text-sm text-secondGray group-hover:text-white">
                add more files
              </h4>
            </div>
            <input
              ref={uploadMoreRef}
              id="upload-more-input"
              type="file"
              name="upload-more-input"
              className="hidden"
              multiple
              onChange={handleAddMoreFiles}
            />
          </div>
        )} */}
      </div>

      {isError.file ? (
        <div className=" w-full mt-4">
          <h5 className="font-popins font-normal text-sm text-errorColor">
            {isError.file}
          </h5>
        </div>
      ) : null}
    </>
  );
}

export default ImageUploader;
