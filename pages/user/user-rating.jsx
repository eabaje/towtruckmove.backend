import React, { useState, useContext, useEffect } from "react";
import { listUserSubscriptions } from "../../context/actions/user/user.action";
import { GlobalContext } from "../../context/Provider";
import { columns } from "../../datasource/dataColumns/usersubscription";
import MainLayout from "../../layout/mainLayout";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/datatable-m";
import dynamic from "next/dynamic";

// import SortIcon from "@mui/icons-material/ArrowDownward";

function UserRating({ query }) {
  // const router = useRouter()
  const { subscribeId, userId } = query;

  const isSingleMode = !subscribeId;

  const {
    authState: { user },
  } = useContext(GlobalContext);
  const {
    userDispatch,
    userState: {
      UserSubscriptions: { data, loading },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (data.length === 0) {
      listUserSubscriptions()(userDispatch)((res) => {})((err) => {
        toast.error(err);
      });
    }
    // console.log(`loading`, loading);
  }, []);
  //  console.log(`data`, data);
  return (
    <MainLayout>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header alert alert-info">
            These are the ratings Konor Autos Inc has received and given. To
            rate another company go to{" "}
            <a href="/protected/company">Search/Rate Companies</a>
            <p>
              For a detailed explanation of our ratings management process and
              guidelines, please refer to the
              <a
                href="/images/services/Central-Dispatch-Ratings-Rules-of-Engagement.pdf"
                target="_blank"
              >
                {" "}
                Rules of Engagement
              </a>
              . For additional assistance please utilize the
              <a href="/contact-us" target="_blank">
                {" "}
                Contact Us{" "}
              </a>{" "}
              link and a ratings management team member will respond via email
              within 1 business day.
            </p>
          </div>
          <div className="card-body table-border-style">
            <p class="lead"></p>

            <hr />

            <ul class="nav nav-tabs">
              <li role="presentation" class="active">
                <a href="/protected/rating?tab=summary&id=">
                  <span class="hidden-xs">My Ratings </span>Summary
                </a>
              </li>
              <li role="presentation">
                <a href="/protected/rating?tab=who&sort=D&sortDir=D&id=">
                  <span class="hidden-xs">Ratings </span>Received
                  <span class="hidden-xs">(1)</span>
                </a>
              </li>
              <li role="presentation">
                <a href="/protected/rating?tab=how&sort=D&sortDir=D&id=">
                  <span class="hidden-xs">Ratings </span>Given
                  <span class="hidden-xs"> to Others</span>
                  <span class="hidden-xs">(0)</span>
                </a>
              </li>
            </ul>

            <br />

            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Past Month</th>
                    <th>
                      <span class="hidden-xs">Past </span>6 Months
                    </th>
                    <th>All-Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>
                        <span class="hidden-xs">Ratings </span>Score
                      </strong>
                    </td>
                    <td id="oneMonthScore">N/A</td>
                    <td id="sixMonthScore">N/A</td>
                    <td id="allTimeScore">100.0</td>
                  </tr>
                  <tr>
                    <td class="text-success">
                      <i class="fa fa-lg fa-smile-o"></i>
                      <strong>Positive</strong>
                    </td>
                    <td id="oneMonthPositive">0</td>
                    <td id="sixMonthPositive">0</td>
                    <td id="allTimePositive">1</td>
                  </tr>
                  <tr>
                    <td class="text-warning">
                      <i class="fa fa-lg fa-meh-o"></i>
                      <strong>Neutral</strong>
                    </td>
                    <td id="oneMonthNeutral">0</td>
                    <td id="sixMonthNeutral">0</td>
                    <td id="allTimeNeutral">0</td>
                  </tr>
                  <tr>
                    <td class="text-danger">
                      <i class="fa fa-lg fa-frown-o"></i>
                      <strong>Negative</strong>
                    </td>
                    <td id="oneMonthNegative">0</td>
                    <td id="sixMonthNegative">0</td>
                    <td id="allTimeNegative">0</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <span class="hidden-xs">Ratings </span>Score:{" "}
                      <span id="ratingsScore">100.0*</span>
                    </th>
                    <th>
                      <span class="hidden-xs">Ratings </span>Received:{" "}
                      <span id="ratingsReceived">1</span>
                    </th>
                    <th colspan="2">
                      <span class="hidden-xs">Member </span>Since:{" "}
                      <span id="ratingsMemberSince">Jul 2014</span>
                    </th>
                  </tr>
                  <tr>
                    <th colspan="4"></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
//Login.layout = "main";
//export default UserSubscription;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(UserRating), { ssr: false });
