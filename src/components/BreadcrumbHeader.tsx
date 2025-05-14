import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";
import { BreadcrumbHeaderProps } from "@/types/types";

const BreadcrumbHeader = ({ items, basePath = "/" }: BreadcrumbHeaderProps) => {
  const pathSegments = items.filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to={basePath}>Home</Link>
        </BreadcrumbItem>

        {pathSegments.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            {index === pathSegments.length - 1 ? (
              <BreadcrumbPage>{item}</BreadcrumbPage>
            ) : (
              <BreadcrumbItem>
                <Link to={`${basePath}${item.toLowerCase()}`}>
                  {item}
                </Link>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHeader;
