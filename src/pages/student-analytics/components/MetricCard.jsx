import React from "react";
import Icon from "../../../components/AppIcon";

const MetricCard = ({ title, value, icon, trend, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          icon: "text-primary",
        };
      case "success":
        return {
          bg: "bg-success-light",
          text: "text-success",
          icon: "text-success",
        };
      case "warning":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          icon: "text-warning",
        };
      case "info":
        return {
          bg: "bg-info-light",
          text: "text-info",
          icon: "text-info",
        };
      default:
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          icon: "text-primary",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`${colorClasses.bg} p-3 rounded-lg`}
          aria-hidden="true"
        >
          <Icon
            name={icon}
            size={24}
            className={colorClasses.icon}
          />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center ${
              trend >= 0 ? "text-success" : "text-error"
            }`}
          >
            <Icon
              name={trend >= 0 ? "TrendingUp" : "TrendingDown"}
              size={16}
              className="mr-1"
            />
            <span className="text-sm font-medium">
              {trend >= 0 ? "+" : ""}
              {trend}
              {typeof value === "string" && value.includes("%") ? "%" : ""}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-text-secondary text-sm font-medium mb-1">{title}</h3>
      <p className="text-h2 font-bold text-text-primary">{value}</p>
    </div>
  );
};

export default MetricCard;