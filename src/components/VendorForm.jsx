"use client";
import React, { useState } from "react";

function VendorForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    designation: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    interestedIn: [],
    interestedInOtherText: "",
    purpose: [],
    purposeOtherText: "",
    demoMode: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="container bandicoot-form-section mx-auto"
      style={{ background: "transparent" }}
      id="enquiry_form"
    >
      <div className="container">
        <div className="form_title">
          <h1 className="text-white text-[40px]">Vendor Registration Form</h1>
          <p className="text-white text-center w-fit">
            Register here to be a vendor with us.
          </p>
        </div>
        <br />
        <div className="bandicoot-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Company Name
                  <input type="text" name="name" placeholder="Company Name" />
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Type Of the Firm
                  <select name="typeOfFirm" id="typeOfFirm">
                    <option selected disabled>
                      Select Type
                    </option>
                    <option>Public Limited Co</option>
                    <option>Partnership Co</option>
                    <option>Proprietorship</option>
                    <option>Govt. Sector</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Status Of Company
                  <select name="statusOfCompany" id="statusOfCompany">
                    <option selected disabled>
                      Select Status
                    </option>
                    <option>MANUFACTURER</option>
                    <option>AUTHORISED DEALER</option>
                    <option>STOCKIST/TRADER</option>
                    <option>IMPORTER/INDIAN AGENT</option>
                    <option>SERVICE PROVIDER</option>
                  </select>
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Country
                  <select name="country" id="country">
                    <option selected disabled>
                      Select Country
                    </option>
                    <option>India</option>
                    <option>UAE</option>
                  </select>
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  GST No
                  <input type="text" name="gst" placeholder="GST Number" />
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <label>
                  Pan No
                  <input type="text" name="pan" placeholder="Pan Number" />
                </label>
              </div>
            </div>
            <hr />
            <fieldset>
              <legend className="sr-only">Address</legend>
              <label>
                Address
                <textarea name="message" placeholder="" />
              </label>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    City
                    <input type="text" name="city" placeholder="City" />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    State
                    <input type="text" name="state" placeholder="State" />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Postcode
                    <input
                      type="text"
                      name="pin"
                      placeholder="PIN Code"
                      required
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Country
                    <input type="text" name="country" />
                  </label>
                </div>
              </div>
            </fieldset>
            <hr />
            <fieldset>
              <legend className="sr-only">Contact information</legend>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Email Address
                    <input type="email" name="email" placeholder="Email" />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Mobile Number
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Contact Person
                    <input
                      type="text"
                      name="pin"
                      placeholder="Name of the Contact Person"
                      required
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Designation
                    <input
                      type="text"
                      name="country"
                      placeholder="Designation of the Contact Person"
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Is your Firm MSME ?
                    <select name="msme" id="msme">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label>
                    Website
                    <input
                      type="text"
                      name="country"
                      placeholder="Website URL"
                    />
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Type of Items Interested for Supply/service*</legend>
              <p className="sr-only">Select all that apply</p>
              <div className="checkbox_item">
                <label>
                  <input type="checkbox" name="purpose" value="Capital Item" />
                  <span className="pt-2">Capital Item</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ABRASIVES"
                  />
                  <span className="pt-2">ABRASIVES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="AUTOMOTIVE CONSUMABLES"
                  />
                  <span className="pt-2">AUTOMOTIVE CONSUMABLES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="BEARING,BUSHINGS AND BELTS"
                  />
                  <span className="pt-2">BEARING,BUSHINGS AND BELTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="BUILDING MATERIALS"
                  />
                  <span className="pt-2">BUILDING MATERIALS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="DRILLING ACCESSORIES"
                  />
                  <span className="pt-2">DRILLING ACCESSORIES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="CHEMICALS,GASES AND LUBRICANTS"
                  />
                  <span className="pt-2">CHEMICALS,GASES AND LUBRICANTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="COMMISSARY AND JANITORIAL"
                  />
                  <span className="pt-2">COMMISSARY AND JANITORIAL</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ELECT.& ELECTRONIC COMPONENTS"
                  />
                  <span className="pt-2">ELECT.& ELECTRONIC COMPONENTS</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="ENAMELS,PAINTS,VARNISHES"
                  />
                  <span className="pt-2">ENAMELS,PAINTS,VARNISHES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="EXPLOSIVES"
                  />
                  <span className="pt-2">EXPLOSIVES</span>
                </label>
              </div>
              <div className="checkbox_item">
                <label>
                  <input
                    type="checkbox"
                    name="purpose"
                    value="FASTNERS & HARDWARE"
                  />
                  <span className="pt-2">FASTNERS & HARDWARE</span>
                </label>
              </div>
            </fieldset>
            <br />
            <label>
              Brief Description of Business of your Company
              <textarea
                name="message"
                placeholder=""
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorForm;
