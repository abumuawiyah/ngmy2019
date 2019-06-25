const base = {
  primary: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(38,143,255,.5)"
    }
  },
  secondary: {
    backgroundColor: "#6c757d",
    borderColor: "#6c757d",
    "&:hover": {
      backgroundColor: "#5a6268",
      borderColor: "#545b62"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(130,138,145,.5)"
    }
  },
  success: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    "&:hover": {
      backgroundColor: "#218838",
      borderColor: "#1e7e34"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(72,180,97,.5)"
    }
  },
  info: {
    backgroundColor: "#17a2b8",
    borderColor: "#17a2b8",
    "&:hover": {
      backgroundColor: "#138496",
      borderColor: "#117a8b"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(58,176,195,.5)"
    }
  },
  warning: {
    color: "#212529",
    backgroundColor: "#ffc107",
    borderColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#e0a800",
      borderColor: "#d39e00"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(222,170,12,.5)"
    }
  },
  danger: {
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    "&:hover": {
      backgroundColor: "#c82333",
      borderColor: "#bd2130"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(225,83,97,.5)"
    }
  }
};

const getVariantByName = name => {
  if (!base[name]) return base.secondary;
  return {
    ...base[name],
    "&:hover": {
      ...base[name]["&:hover"]
    },
    "&:focus": {
      outline: 0,
      ...base[name]["&:focus"]
    }
  };
};

const styles = props => {
  const { variant } = props;
  return {
    input: {
      display: "inline-block",
      fontWeight: 400,
      color: "#fff",
      textAlign: "center",
      userSelect: "none",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      padding: ".375rem .75rem",
      fontSize: "1rem",
      lineHeight: 1.5,
      borderRadius: ".25rem",
      whiteSpace: "nowrap",
      "&::after": {
        display: "inline-block",
        marginLeft: ".255em",
        verticalAlign: ".255em",
        content: '""',
        borderTop: ".3em solid",
        borderRight: ".3em solid transparent",
        borderBottom: 0,
        borderLeft: ".3em solid transparent"
      },
      ...getVariantByName(variant)
    },
    chevron: {
      transform: "rotate(180deg)",
      flex: "0 0 16px"
    },
    list: {
      top: "100%",
      left: 0,
      minWidth: "10rem",
      padding: ".5rem 0",
      margin: ".125rem 0 0",
      fontSize: "1rem",
      color: "#212529",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      border: "1px solid rgba(0,0,0,.15)",
      borderRadius: ".25rem",
      "& a": {
        display: "block",
        padding: ".25rem 1.5rem",
        clear: "both",
        fontWeight: 400,
        color: "#212529",
        backgroundColor: "transparent",
        border: 0
      },
      "& a:hover": {
        backgroundColor: "#f8f9fa"
      }
    },
    highlight: {
      background: "red"
    }
  };
};

export default styles;
