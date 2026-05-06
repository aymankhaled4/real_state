import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import type IProperty from "../../interfaces/Iproperties";
import AuthContext from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";

interface Props {
  property: IProperty;
}

export default function PropertyDetailSidebar({ property }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleSave = () => {
    if (!user) { setShowAuthModal(true); return; }
    toggleFavorite(String(property.id));
  };

  const handleContact = () => {
    if (!user) { setShowAuthModal(true); return; }
    setShowModal(true);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setShowModal(false);
      setSent(false);
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className="bg-surface-elevated rounded-3xl p-6 shadow-sm border border-border lg:sticky lg:top-6">
        <h2 className="text-foreground font-semibold text-base mb-4">
          Interested in this property?
        </h2>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-sm text-muted-foreground mb-3 hover:bg-surface transition cursor-pointer"
        >
          <span>{isFavorite(String(property.id)) ? "❤️" : "🤍"}</span>
          {isFavorite(String(property.id)) ? "Saved to Favorites" : "Save to Favorites"}
        </button>

        <button
          onClick={handleContact}
          className="w-full bg-[#006C4A] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#005a3d] transition cursor-pointer"
        >
          Contact Agent
        </button>

        <hr className="my-5 border-border" />

        <h3 className="text-foreground font-semibold text-sm mb-3">
          Property Details
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { label: "Property ID", value: `#${property.id}` },
            { label: "Type", value: "Sale" },
            { label: "Location", value: property.city },
            { label: "Bedrooms", value: property.bedrooms },
            { label: "Bathrooms", value: property.bathrooms },
            { label: "Area", value: `${property.area} sqft` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="text-foreground font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-surface-elevated rounded-3xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center text-center gap-4">
            <span className="text-5xl">🔒</span>
            <h3 className="text-foreground font-bold text-lg">Login Required</h3>
            <p className="text-muted-foreground text-sm">
              You need to log in first to use this feature.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowAuthModal(false)}
                className="flex-1 border border-border rounded-xl py-2.5 text-sm text-muted-foreground hover:bg-surface transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-[#006C4A] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#005a3d] transition cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-surface-elevated rounded-3xl p-6 w-full max-w-md shadow-xl">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <span className="text-4xl">✅</span>
                <p className="text-foreground font-semibold text-base">Message Sent!</p>
                <p className="text-muted-foreground text-sm text-center">
                  The agent will get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-foreground font-semibold text-base">Contact Agent</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-muted-foreground hover:text-foreground text-xl cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  Send a message about{" "}
                  <span className="text-foreground font-medium">{property.title}</span>
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:border-[#006C4A] focus:ring-2 focus:ring-[#006C4A]/10 resize-none mb-4"
                />

                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="w-full bg-[#006C4A] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#005a3d] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}