"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization } from "@/app/fonts";
import { PDFErrorBoundary } from "@/components/PDFErrorBoundary";
import {
  HiDownload,
  HiZoomIn,
  HiZoomOut,
  HiOutlineArrowsExpand,
  HiExternalLink,
} from "react-icons/hi";

interface HTMLIFrameElementWithFullscreen extends HTMLIFrameElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface DocumentWithFullscreen extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

// Utility to detect browser capabilities
const getBrowserInfo = () => {
  if (typeof window === "undefined")
    return { canViewPDF: true, isMobile: false };

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  const isIOS = /ipad|iphone|ipod/.test(userAgent);
  const isChrome = /chrome/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !isChrome;

  // Safari and mobile browsers often have issues with embedded PDFs
  const canViewPDF = !isIOS && (isChrome || isFirefox);

  return { canViewPDF, isMobile, isIOS, isChrome, isFirefox, isSafari };
};

export default function Resume() {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMethod, setViewMethod] = useState<"iframe" | "object" | "embed">(
    "iframe"
  );
  const [retryCount, setRetryCount] = useState(0);
  const [browserInfo, setBrowserInfo] = useState({
    canViewPDF: true,
    isMobile: false,
  });

  const PDF_URL = "/docs/Zaheer_Alil_Shaikh_Resume.pdf";
  const MAX_RETRIES = 2;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-60px",
    amount: 0.2,
  });

  useEffect(() => {
    // Set browser info on mount
    const info = getBrowserInfo();
    setBrowserInfo(info);

    // If browser likely can't view PDFs, show error state immediately
    if (!info.canViewPDF) {
      setIsLoading(false);
      setPdfError(true);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handlePDFLoadingTimeout = () => {
      if (isLoading) {
        console.warn("PDF loading timeout, trying fallback method");
        setIsLoading(false);

        if (retryCount < MAX_RETRIES) {
          // Try different viewing methods
          if (viewMethod === "iframe" && retryCount === 0) {
            setViewMethod("object");
            setRetryCount((prev) => prev + 1);
            setIsLoading(true);
          } else if (viewMethod === "object" && retryCount === 1) {
            setViewMethod("embed");
            setRetryCount((prev) => prev + 1);
            setIsLoading(true);
          } else {
            setPdfError(true);
          }
        } else {
          setPdfError(true);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // Timeout for PDF loading
    const loadingTimeout = setTimeout(handlePDFLoadingTimeout, 10000); // 10 second timeout

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      clearTimeout(loadingTimeout);
    };
  }, [isLoading, retryCount, viewMethod]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const iframe = document.querySelector(
        "iframe"
      ) as HTMLIFrameElementWithFullscreen;
      if (iframe?.requestFullscreen) {
        iframe.requestFullscreen();
        setIsFullscreen(true);
      } else if (iframe?.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
        setIsFullscreen(true);
      } else if (iframe?.msRequestFullscreen) {
        iframe.msRequestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      const doc = document as DocumentWithFullscreen;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
        setIsFullscreen(false);
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
        setIsFullscreen(false);
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handlePDFError = () => {
    console.error("PDF loading failed, attempt:", retryCount + 1);
    setIsLoading(false);

    if (retryCount < MAX_RETRIES) {
      // Try different viewing methods
      if (viewMethod === "iframe" && retryCount === 0) {
        setViewMethod("object");
        setRetryCount((prev) => prev + 1);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000); // Timeout fallback
      } else if (viewMethod === "object" && retryCount === 1) {
        setViewMethod("embed");
        setRetryCount((prev) => prev + 1);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000); // Timeout fallback
      } else {
        setPdfError(true);
      }
    } else {
      setPdfError(true);
    }
  };

  const resetPDFViewer = () => {
    setPdfError(false);
    setIsLoading(true);
    setViewMethod("iframe");
    setRetryCount(0);
  };

  return (
    <div className="min-h-screen relative" ref={ref}>
      {/* Background Component */}
      <Background />

      {/* Enhanced floating background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl"
        style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
        animate={
          isInView
            ? {
                scale: [0.8, 1.2, 1],
                opacity: [0, 0.4, 0.15, 0.3],
                x: [0, 30, -15, 0],
                y: [0, -20, 25, 0],
              }
            : {
                scale: 0.8,
                opacity: 0,
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-24 w-24 h-24 rounded-full blur-2xl"
        style={{ backgroundColor: "hsl(var(--secondary) / 0.12)" }}
        animate={
          isInView
            ? {
                scale: [0.6, 1, 0.9, 1],
                opacity: [0, 0.35, 0.25, 0.2],
                x: [0, -20, 10, 0],
                y: [0, 15, -10, 0],
                rotate: [0, 180, 360],
              }
            : {
                scale: 0.6,
                opacity: 0,
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <Fragment>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-24 relative z-10 overflow-x-hidden">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-12 space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className={`${nasalization.className} text-5xl md:text-6xl lg:text-7xl font-bold`}
              style={{ color: "hsl(var(--primary))" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              My Resume
            </motion.h1>

            <motion.p
              className="text-primary-foreground/70 text-xl md:text-2xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              View and download my latest resume
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Enhanced PDF Controls */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-gradient-to-r from-card/20 via-card/30 to-card/20 backdrop-blur-xl rounded-2xl border border-primary/20" />
            <div className="relative flex flex-wrap justify-center gap-4 p-6">
              <motion.button
                onClick={handleZoomOut}
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-primary/30 bg-primary/10 hover:bg-primary/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px hsl(var(--primary) / 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <HiZoomOut className="w-4 h-4 text-primary relative z-10" />
                <span className="text-primary-foreground font-medium relative z-10">
                  Zoom Out
                </span>
              </motion.button>

              <motion.div
                className="flex items-center px-5 py-3 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <span className="text-primary-foreground font-mono font-semibold text-lg">
                  {zoom}%
                </span>
              </motion.div>

              <motion.button
                onClick={handleZoomIn}
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-primary/30 bg-primary/10 hover:bg-primary/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px hsl(var(--primary) / 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <HiZoomIn className="w-4 h-4 text-primary relative z-10" />
                <span className="text-primary-foreground font-medium relative z-10">
                  Zoom In
                </span>
              </motion.button>

              <motion.button
                onClick={toggleFullscreen}
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-secondary/10 hover:bg-secondary/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px hsl(var(--secondary) / 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <HiOutlineArrowsExpand className="w-4 h-4 text-secondary relative z-10" />
                <span className="text-primary-foreground font-medium relative z-10">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
              </motion.button>

              <motion.a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-card/30 hover:bg-secondary/10"
                whileHover={{
                  scale: 1.05,
                  borderColor: "hsl(var(--secondary) / 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <HiExternalLink className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground font-medium">
                  Open in New Tab
                </span>
              </motion.a>

              <motion.a
                href={PDF_URL}
                download="Zaheer_Alil_Shaikh_Resume.pdf"
                className="group relative flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 font-medium text-white"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                  boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 35px hsl(var(--primary) / 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <HiDownload className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Download PDF</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Enhanced Resume Container */}
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            {/* Glass morphism background with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-card/20 to-card/30 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl" />
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl bg-clip-border" />

            <PDFErrorBoundary pdfUrl={PDF_URL}>
              {/* PDF Viewer with enhanced styling */}
              <motion.div
                className="pdf-container relative w-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl"
                style={{ height: "800px" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                {isLoading && (
                  <motion.div
                    className="pdf-loading relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse" />

                    <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                      {/* Enhanced loading spinner */}
                      <div className="relative">
                        <motion.div
                          className="w-16 h-16 rounded-full border-4 border-primary/20"
                          style={{
                            borderTopColor: "hsl(var(--primary))",
                            borderRightColor: "hsl(var(--secondary))",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <motion.div
                          className="absolute inset-2 w-12 h-12 rounded-full border-2 border-secondary/30"
                          style={{
                            borderLeftColor: "hsl(var(--secondary))",
                            borderBottomColor: "hsl(var(--primary))",
                          }}
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>

                      <motion.div
                        className="text-primary text-2xl font-semibold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Loading PDF...
                      </motion.div>

                      <motion.div
                        className="text-primary-foreground/60 text-lg text-center max-w-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Method:{" "}
                        <span className="font-mono text-secondary">
                          {viewMethod}
                        </span>
                        {retryCount > 0 && (
                          <span className="block mt-1 text-sm">
                            Attempt {retryCount + 1} of {MAX_RETRIES + 1}
                          </span>
                        )}
                      </motion.div>

                      {/* Enhanced progress bar */}
                      <div className="w-80 max-w-full">
                        <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: "0%" }}
                            animate={{
                              width: `${Math.min(100, (retryCount + 1) * 33)}%`,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-primary-foreground/40">
                          <span>iframe</span>
                          <span>object</span>
                          <span>embed</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {pdfError ? (
                  <div className="flex flex-col justify-center items-center h-full p-8 text-center">
                    <div className="text-destructive text-lg mb-4">
                      Unable to display PDF preview
                    </div>
                    <p className="text-primary-foreground/60 mb-6">
                      Your browser may not support embedded PDFs. Try the
                      options below:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <motion.a
                        href={PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiExternalLink className="w-5 h-5" />
                        Open PDF in New Tab
                      </motion.a>
                      <motion.a
                        href={PDF_URL}
                        download="Zaheer_Alil_Shaikh_Resume.pdf"
                        className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiDownload className="w-5 h-5" />
                        Download PDF
                      </motion.a>
                    </div>
                    <motion.button
                      onClick={resetPDFViewer}
                      className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent-foreground rounded-lg transition-all duration-300 border border-accent/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiOutlineArrowsExpand className="w-4 h-4" />
                      Retry Loading PDF
                    </motion.button>
                    <p className="text-primary-foreground/40 text-xs mt-2">
                      Tried {retryCount + 1}/{MAX_RETRIES + 1} methods:{" "}
                      {viewMethod}
                    </p>
                  </div>
                ) : (
                  <div className="pdf-viewer">
                    <div
                      className="flex justify-center items-start min-h-full p-4"
                      style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "top center",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {/* Dynamic PDF viewer based on method */}
                      {viewMethod === "iframe" && (
                        <iframe
                          key={`iframe-${retryCount}`}
                          src={`${PDF_URL}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                          width="100%"
                          height="780px"
                          className="border-0 shadow-lg rounded-lg"
                          title="Resume PDF"
                          onLoad={() => {
                            setIsLoading(false);
                            console.log("PDF loaded successfully via iframe");
                          }}
                          onError={handlePDFError}
                          style={{
                            maxWidth: "100%",
                            minHeight: "600px",
                            background: "#ffffff",
                          }}
                          allow="fullscreen"
                        />
                      )}

                      {viewMethod === "object" && (
                        <object
                          key={`object-${retryCount}`}
                          data={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                          type="application/pdf"
                          width="100%"
                          height="780px"
                          className="border-0 shadow-lg rounded-lg"
                          onLoad={() => {
                            setIsLoading(false);
                            console.log("PDF loaded successfully via object");
                          }}
                          onError={handlePDFError}
                          style={{
                            maxWidth: "100%",
                            minHeight: "600px",
                            background: "#ffffff",
                          }}
                        >
                          <p className="text-center p-4">
                            PDF cannot be displayed.{" "}
                            <a
                              href={PDF_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline"
                            >
                              Click here to view the PDF
                            </a>
                          </p>
                        </object>
                      )}

                      {viewMethod === "embed" && (
                        <embed
                          key={`embed-${retryCount}`}
                          src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                          type="application/pdf"
                          width="100%"
                          height="780px"
                          className="border-0 shadow-lg rounded-lg"
                          onLoad={() => {
                            setIsLoading(false);
                            console.log("PDF loaded successfully via embed");
                          }}
                          onError={handlePDFError}
                          style={{
                            maxWidth: "100%",
                            minHeight: "600px",
                            background: "#ffffff",
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </PDFErrorBoundary>
          </motion.div>

          {/* Enhanced Browser compatibility and info section */}
          <motion.div
            className="relative mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-gradient-to-r from-card/10 via-card/20 to-card/10 backdrop-blur-xl rounded-2xl border border-primary/10" />

            <div className="relative text-center p-8 space-y-4">
              <motion.p
                className="text-primary-foreground/70 text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.9 }}
              >
                💡 Use the controls above to zoom, view fullscreen, or download
                the PDF
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-6 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary-foreground/60 font-mono">
                    {viewMethod}
                    {retryCount > 0 && ` (attempt ${retryCount + 1})`}
                  </span>
                </div>

                {browserInfo.isMobile && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                    <span>📱</span>
                    <span className="text-primary-foreground/60">
                      Mobile detected
                    </span>
                  </div>
                )}

                {!browserInfo.canViewPDF && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <span>⚠️</span>
                    <span className="text-amber-400">
                      Limited PDF support detected
                    </span>
                  </div>
                )}
              </motion.div>

              <motion.p
                className="text-primary-foreground/50 text-sm max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
              >
                If the PDF doesn&apos;t display properly, try the &quot;Open in
                New Tab&quot; button for the best viewing experience in your
                browser&apos;s built-in PDF reader.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </Fragment>
    </div>
  );
}
