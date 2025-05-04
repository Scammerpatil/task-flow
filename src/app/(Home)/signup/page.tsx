"use client";
import { Organization, Team } from "@/types/user";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [team, setTeam] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState();
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    profileImage: "",
    team: "",
    oraganization: "",
    otp: "",
  });
  const router = useRouter();
  const formDataChecker = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.profileImage
    ) {
      return false;
    }
    if (formData.phone.length !== 10) {
      return false;
    }
    if (
      !formData.email.includes("@") ||
      !formData.email.includes(".") ||
      formData.email.length < 5
    ) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }
    if (formData.profileImage.length < 5) {
      return false;
    }
    if (formData.name.length < 3) {
      return false;
    }
    if (formData.phone.length !== 10) {
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!formDataChecker()) {
      toast.error("Please fill all the fields correctly");
      return;
    }
    if (!otp) {
      toast.error("Please verify your email first");
      return;
    }
    const response = axios.post(`/api/auth/${formData.role}-signup`, {
      formData,
    });
    toast.promise(response, {
      loading: "Creating Account",
      success: () => {
        router.push("/login");
        return "Account Created Successfully";
      },
      error: (err: any) => {
        console.log(err);
        return err.response.data.message;
      },
    });
  };
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", { file });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            profileImage: data.data.data.url,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };
  const verifyEmail = async () => {
    if (
      !formData.email ||
      !formData.email.includes("@") ||
      !formData.email.includes(".")
    ) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = axios.post("/api/helper/verify-email", {
        name: formData.name,
        email: formData.email,
      });
      toast.promise(response, {
        loading: "Sending Email...",
        success: (data: AxiosResponse) => {
          (
            document.getElementById("otpContainer") as HTMLDialogElement
          ).showModal();
          setOtp(data.data.token);
          return "Email Sent!!";
        },
        error: (err: any) =>
          err.data?.response.message || "Something went wrong",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };
  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await axios.get("/api/organization/getAllOrganizations");
      setAllOrganizations(response.data.organisations);
    };
    fetchOrganizations();
  }, []);
  useEffect(() => {
    const fetchTeams = async () => {
      if (!formData.oraganization) return;
      const response = await axios.get(
        "/api/team/getTeam?organizationId=" + formData.oraganization
      );
      setTeam(response.data.teams);
    };
    fetchTeams();
  }, [formData.oraganization]);
  return (
    <div className="flex justify-center items-center w-full bg-base-200 px-5 py-5">
      <div className="xl:max-w-7xl bg-base-100 drop-shadow-xl border border-base-content/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img src="sider.svg" alt="login" className="h-[500px]" />
        </div>
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <select
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.role}
                onChange={(e) => {
                  setFormData({ ...formData, role: e.target.value });
                }}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="admin">Admin | Head Of Organisation</option>
                <option value="manager">Manager</option>
                <option value="team_member">Team Member</option>
              </select>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />

              <div className="flex flex-col sm:flex-row gap-3 text-base-content">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline btn-primary"
                  onClick={verifyEmail}
                  disabled={
                    emailVerified ||
                    !formData.email ||
                    !formData.email.includes("@") ||
                    !formData.email.includes(".")
                  }
                >
                  Verify Email
                </button>
              </div>
              <input
                type="number"
                name="phone"
                minLength={10}
                maxLength={10}
                placeholder="Enter Your Contact No"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
              />
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Profile Image <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full text-base-content"
                  accept="image/* .png .jpeg .jpg"
                  onChange={handleProfileImageChange}
                />
              </div>
              {formData.role === "manager" && (
                <select
                  className="select select-bordered select-primary w-full text-base-content"
                  onChange={(e) => {
                    setFormData({ ...formData, oraganization: e.target.value });
                  }}
                >
                  <option value="">Select Organization</option>
                  {allOrganizations.map((organization: Organization) => (
                    <option
                      key={organization._id as unknown as string}
                      value={organization._id as unknown as string}
                    >
                      {`${organization.name} - ${organization.domain}`}
                    </option>
                  ))}
                </select>
              )}
              {formData.role === "team_member" && (
                <>
                  <select
                    className="select select-bordered select-primary w-full text-base-content"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        oraganization: e.target.value,
                      });
                    }}
                  >
                    <option value="">Select Organization</option>
                    {allOrganizations.map((organization: Organization) => (
                      <option
                        key={organization._id as unknown as string}
                        value={organization._id as unknown as string}
                      >
                        {`${organization.name} - ${organization.domain}`}
                      </option>
                    ))}
                  </select>
                  <select
                    className="select select-bordered select-primary w-full text-base-content"
                    onChange={(e) => {
                      setFormData({ ...formData, team: e.target.value });
                    }}
                  >
                    <option value="">Select Team</option>
                    {team.length !== 0 ? (
                      team.map((team: Team) => (
                        <option
                          key={team._id as unknown as string}
                          value={team._id as unknown as string}
                        >
                          {`${team.name} - ${team.domain}`}
                        </option>
                      ))
                    ) : (
                      <option value="">No Team Found</option>
                    )}
                  </select>
                </>
              )}
              <label className="input input-primary input-bordered flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full text-base-content placeholder:text-base-content/70"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                {showPassword ? (
                  <IconEyeOff
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IconEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              <div className="flex items-center gap-1.5  justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => {
                        setDisabled(!disabled);
                      }}
                    />
                  </label>
                </div>
                <h3 className="flex items-center whitespace-nowrap text-base text-base-content">
                  I agree to the
                  <span className="text-primary">&nbsp;Terms</span>
                  &nbsp;and
                  <span className="text-primary">&nbsp;Privacy Policy</span>.
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button
                  className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  onClick={handleSubmit}
                  disabled={disabled || !emailVerified}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-3 text-base text-base-content">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <dialog id="otpContainer" className="modal">
        <div className="modal-box space-y-4">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center text-base-content uppercase my-4">
            Please Enter The OTP
          </h3>
          <input
            type="text"
            placeholder="Enter Your OTP"
            className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
            value={formData.otp}
            onChange={(e) => {
              setFormData({ ...formData, otp: e.target.value });
            }}
          />
          <button
            className="btn btn-primary w-full"
            onClick={(e) => {
              if (otp === formData.otp) {
                setEmailVerified(true);
                toast.success("OTP Verified");
                (
                  document.getElementById("otpContainer") as HTMLDialogElement
                ).close();
              } else {
                toast.error("Invalid OTP!!!");
              }
            }}
          >
            Verify
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SignUp;
