import React from "react";

function Home({user}) {

  return (
    <>
      <div className="d-flex justify-content-start align-items-center m-4">
        <div class="card p-3 bg-light">
          <div class="d-flex justify-items-between align-items-center gap-3">
              <div class="image"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="ProfilePic" class="rounded" width="100"/> </div>
              <div>
                  <h4 class="mb-0 mt-0">{user.firstName} {user.lastName}</h4> <span>{user.bio}</span>
                  <p>ContactNo: {user.contactNo}</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
