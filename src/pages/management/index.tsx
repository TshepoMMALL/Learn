import { memo, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Tab } from "@headlessui/react";
import ManagementTabOne from "../../../components/ManagementTabOne";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoard from "../../../components/EmptyBoard";
import ManagementTabOneHeader from "../../../components/ManagementTabOneHeader";
import boardsSlice from "@/redux/boardsSlice";

// Classes

function classNames(...classes: string[] | any[]) {
  return classes.filter(Boolean).join(" ");
}

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function getData(url = "", data = {}) {
      // setLoading(true);
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 1c5914b1-9eaf-3aa7-a0d9-cf11c0a72e10",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data: string | any) => {
          // console.log(data);
          // console.log(data.EtPartsInfo.results);
          setData(data);
          // setLoading(false);
        });
    }

    getData("https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet", {
      IvSvcOrderNo: search,
      // IvAscJobNo: "4266443508",
      IsCommonHeader: {
        Company: "C720",
        AscCode: "1730640",
        Lang: "EN",
        Country: "ZA",
        Pac: "999999920180502152320",
      },
    });
  }, [search]);

  // if (isLoading) return <p>Loading...</p>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // Board logic
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          {/* <section className="my-4 flex justify-center flex-col items-center gap-2">
            <form onSubmit={handleSubmit} className="flex flex-row gap-2">
              <label htmlFor="searchPart" className="sr-only">
                Search here
              </label>
              <input
                className="searchInput search input placeholder-sky-900 outline-none text-gray-950"
                placeholder="Search Service Order No."
                type="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="bg-sky-700 py-3 px-4 rounded text-white border-0 font-sans font-medium hover:bg-sky-950 cursor-pointer"
              />
            </form>
          </section> */}

          {/* <section className="w-full overflow-auto my-5">
            <h2>EtFlowInfo</h2>
            <table>
              <thead>
                <tr>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>CreatedTm</th>
                  <th>Depth</th>
                  <th>DetailType</th>
                  <th>DetailTypeDesc</th>
                  <th>ProcessName</th>
                  <th>ProcessType</th>
                  <th>RelationType</th>
                  <th>Status</th>
                  <th>StatusDesc</th>
                  <th>SvcOrderNo</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.EtFlowInfo?.results.map((item: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>{item.CreatedBy}</td>
                        <td>{item.CreatedAt}</td>
                        <td>{item.CreatedTm}</td>
                        <td>{item.Depth}</td>
                        <td>{item.DetailType}</td>
                        <td>{item.DetailTypeDesc}</td>
                        <td>{item.PrcoessTypeName}</td>
                        <td>{item.ProcessType}</td>
                        <td>{item.RelationType}</td>
                        <td>{item.Status}</td>
                        <td>{item.StatusDesc}</td>
                        <td>{item.SvcOrderNo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
          <section className="w-full overflow-auto my-5">
            <h2>EtLogInfo</h2>
            <table>
              <thead>
                <tr>
                  <th>AscCode</th>
                  <th>ChangedBy</th>
                  <th>Channel</th>
                  <th>StReason</th>
                  <th>StReasonDesc</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.EtLogInfo?.results.map((item: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>{item.AscCode}</td>
                        <td>{item.ChangedBy}</td>
                        <td>{item.Channel}</td>
                        <td>{item.StReason}</td>
                        <td>{item.StReasonDesc}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
          <section className="w-full overflow-auto my-5">
            <h2>EtPartsInfo</h2>
            <table>
              <thead>
                <tr>
                  <th>GoodIssueDate</th>
                  <th>InvoiceItemNo</th>
                  <th>InvoiceNo</th>
                  <th>MateralRequestNo</th>
                  <th>PODate</th>
                  <th>PONo</th>
                  <th>POStatus</th>
                  <th>PartStatus</th>
                  <th>PartsDesc</th>
                  <th>PartsNo</th>
                  <th>PartsQty</th>
                  <th>PartsRecvDate</th>
                  <th>PartsSerial</th>
                  <th>PartsSerialOld</th>
                  <th>RepairLocation</th>
                  <th>RequestDate</th>
                  <th>SamsungOrderDate</th>
                  <th>SamsungOrderNo</th>
                  <th>SeqNo</th>
                  <th>TrackingNo</th>
                  <th>WtyType</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.EtPartsInfo?.results.map((item: any, index: any) => {
                    const {
                      GoodIssueDate,
                      InvoiceItemNo,
                      InvoiceNo,
                      MateralRequestNo,
                      PODate,
                      PONo,
                      POStatus,
                      PartStatus,
                      PartsDesc,
                      PartsNo,
                      PartsQty,
                      PartsRecvDate,
                      PartsSerial,
                      PartsSerialOld,
                      RepairLocation,
                      RequestDate,
                      SamsungOrderDate,
                      SamsungOrderNo,
                      SeqNo,
                      TrackingNo,
                      WtyType,
                    } = item;
                    return (
                      <tr key={index}>
                        <td>{GoodIssueDate}</td>
                        <td>{InvoiceItemNo}</td>
                        <td>{InvoiceNo}</td>
                        <td>{MateralRequestNo}</td>
                        <td>{PODate}</td>
                        <td>{PONo}</td>
                        <td>{POStatus}</td>
                        <td>{PartStatus}</td>
                        <td>{PartsDesc}</td>
                        <td>{PartsNo}</td>
                        <td>{PartsQty}</td>
                        <td>{PartsRecvDate}</td>
                        <td>{PartsSerial}</td>
                        <td>{PartsSerialOld}</td>
                        <td>{RepairLocation}</td>
                        <td>{RequestDate}</td>
                        <td>{SamsungOrderDate}</td>
                        <td>{SamsungOrderNo}</td>
                        <td>{SeqNo}</td>
                        <td>{TrackingNo}</td>
                        <td>{WtyType === "O" ? "OOW" : "IW"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section> */}
          <section>
            <div className="tabs w-full max-w-full px-2 py-16 sm:px-0">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    Kanboard View
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    Tab 2
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    Tab 3
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <div className=" overflow-hidden  overflow-x-scroll">
                      {boards.length > 0 ? (
                        <>
                          <ManagementTabOneHeader
                            setIsBoardModalOpen={setIsBoardModalOpen}
                            isBoardModalOpen={isBoardModalOpen}
                          />
                          <ManagementTabOne
                            setIsBoardModalOpen={setIsBoardModalOpen}
                            isBoardModalOpen={isBoardModalOpen}
                          />
                        </>
                      ) : (
                        <>
                          <EmptyBoard type="add" />
                        </>
                      )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    Content 2
                  </Tab.Panel>
                  <Tab.Panel
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    Content 3
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
