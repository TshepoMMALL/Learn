import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Kanban from "../../../components/Kanban";
// import Table from "../../../components/Table";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function MyModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        className="bg-green-800 text-white font-semibold rounded px-4 py-2 border-0"
        onClick={onOpen}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount
        closeOnEsc
        closeOnOverlayClick
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fields will auto populate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="flex flex-col">
              <label
                htmlFor="service_order"
                className="text-gray-800 font-medium"
              >
                Service Order No
              </label>
              <input
                type="number"
                placeholder="Testing input"
                name="service_order"
                id="service_order"
                className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md font-medium shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-red-500 invalid:text-red-600
                focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
              <label htmlFor="assign_to" className="text-gray-800 font-medium">
                Assign to
              </label>
              <input
                disabled
                type="text"
                placeholder="Testing input"
                name="assign_to"
                id="assign_to"
                className="mt-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md font-medium shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              className="bg-sky-800 text-white font-semibold rounded px-4 py-2 border-0 mr-3"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="bg-green-800 text-white font-semibold rounded px-4 py-2 border-0"
            >
              Assign
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Management = () => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  // useEffect(() => {
  //   async function getData(url = "", data = {}) {
  //     // setLoading(true);
  //     await fetch(url, {
  //       method: "POST", // *GET, POST, PUT, DELETE, etc.
  //       mode: "cors", // no-cors, *cors, same-origin
  //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: "same-origin", // include, *same-origin, omit
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       redirect: "follow", // manual, *follow, error
  //       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //       body: JSON.stringify(data), // body data type must match "Content-Type" header
  //     })
  //       .then((res) => res.json())
  //       .then((data: string | any) => {
  //         // console.log(data);
  //         // Error message
  //         // console.log(data.Return.EvRetMsg);
  //         // console.log(data.EtPartsInfo.results);
  //         setData(data);
  //         // setLoading(false);
  //       });
  //   }

  //   getData("https://eu.ipaas.samsung.com/eu/gcic/GetSOInfoAll/1.0/ImportSet", {
  //     IvSvcOrderNo: search,
  //     // IvAscJobNo: "4266443508",
  //     IsCommonHeader: {
  //       Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
  //       AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
  //       Lang: `${process.env.NEXT_PUBLIC_LANG}`,
  //       Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
  //       Pac: `${process.env.NEXT_PUBLIC_PAC}`,
  //     },
  //   });
  // }, [search]);

  // if (isLoading) return <p>Loading...</p>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <>
      <Navbar />

      <main>
        <div className="container flex justify-center flex-col mx-auto p-2">
          <section className="my-4 flex justify-center flex-col items-center gap-2">
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
          </section>

          <section className="my-5">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Board View</Tab>
                <Tab>Table View</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Kanban />
                </TabPanel>
                <TabPanel>
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
                          data?.EtFlowInfo?.results.map(
                            (item: any, index: any) => {
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
                            }
                          )}
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
                          data?.EtLogInfo?.results.map(
                            (item: any, index: any) => {
                              return (
                                <tr key={index}>
                                  <td>{item.AscCode}</td>
                                  <td>{item.ChangedBy}</td>
                                  <td>{item.Channel}</td>
                                  <td>{item.StReason}</td>
                                  <td>{item.StReasonDesc}</td>
                                </tr>
                              );
                            }
                          )}
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
                          data?.EtPartsInfo?.results.map(
                            (item: any, index: any) => {
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
                            }
                          )}
                      </tbody>
                    </table>
                  </section> */}
                  <section>
                    <section className="my-3 flex justify-center">
                      <MyModal />
                    </section>
                    <p>More content coming soon</p>
                    {/* <Table /> */}
                  </section>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </section>
        </div>
      </main>
    </>
  );
};
export default memo(Management);
