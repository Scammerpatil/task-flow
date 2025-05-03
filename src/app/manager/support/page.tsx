"use client";
import { toast } from "react-hot-toast";

export default function SupportPage() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-2xl">Support & Help</h2>
          <p className="text-sm text-base-content">
            Facing an issue? Read below before reaching out.
          </p>

          <div className="mt-4 space-y-4">
            <div className="alert alert-info">
              <span>
                <strong>Ignore HTML Warnings:</strong> If you see HTML
                validation or hydration warnings in dev mode, they’re safe to
                ignore unless you're modifying layout structure.
              </span>
            </div>

            <div className="alert alert-warning">
              <span>
                <strong>Token Expired:</strong> If you're logged out
                automatically, it might be due to token expiry. Please re-login
                to continue.
              </span>
            </div>

            <div className="alert alert-error">
              <span>
                <strong>Internal Server Error:</strong> This typically happens
                when the server is restarting or your data is malformed. Contact
                your admin if it persists.
              </span>
            </div>

            <div className="alert alert-success">
              <span>
                <strong>Profile Update Issue:</strong> If updates are not
                saving, ensure only valid fields are being changed. Avoid
                sending `_id` or `__v`.
              </span>
            </div>
          </div>

          <div className="divider">Contact</div>

          <p className="text-sm">
            For unresolved issues, email us at:{" "}
            <span
              className="link link-primary underline cursor-pointer"
              onClick={() => handleCopy("support@novacops.com")}
            >
              support@novacops.com
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
