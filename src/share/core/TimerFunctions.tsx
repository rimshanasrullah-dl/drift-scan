 export const getDubaiDate = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "numeric", // Change to numeric for easier math
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());

  const getPart = (type: string) => parseInt(parts.find((p) => p.type === type)?.value || "0");

  const year = getPart("year");
  const month = getPart("month") - 1; 
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  return new Date(year, month, day, hour, minute, second);
};

  export const parseExpiryTime = (dateStr: any) => {
  if (!dateStr) return null;

  // Split logic remains the same
  const parts = dateStr.split(/ (?!.* )/);
  if (parts.length < 2) return null;

  const [datePart, timePart] = parts;
  const [day, monthStr, year] = datePart.split(" ");
  const [hour, minute] = timePart.split(":");

  const monthMap: any = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  // Create date normally
  const date = new Date(year, monthMap[monthStr], day, hour, minute, 0);
  
  // OPTIONAL: If the string "20:00" ALWAYS means Dubai time, 
  // but the user might be in Pakistan, you need to handle offsets here.
  // For now, assuming your app is only used in the correct timezone:
  return date;
};


export  function convertToMinutes(prepTimeStr:any) {
  // Ensure prepTimeStr is a string
  if (typeof prepTimeStr !== 'string') return 0;

  const units = [
    { regex: /(\d+)\s*(?:day|d)/i, factor: 1440 },
    { regex: /(\d+)\s*(?:hour|h)/i, factor: 60 },
    { regex: /(\d+)\s*(?:minute|min|m)/i, factor: 1 }
  ];

  return units.reduce((total, unit) => {
    const match = prepTimeStr.match(unit.regex);
    if (match && match[1]) {
      total += parseInt(match[1], 10) * unit.factor;
    }
    return total;
  }, 0);

}

export const getMinutesDifference = (pickupTimeStr: string, currentTime: string | Date) => {
  // 1. Helper to parse your specific date string "2 Jan 2026 01:00"
  const parsePickupDate = (str: string) => {
    if (!str) return null;
    const parts = str.split(" ");
    if (parts.length < 4) return null;

    const day = parseInt(parts[0]);
    const monthStr = parts[1];
    const year = parseInt(parts[2]);
    const [hour, minute] = parts[3].split(":").map(Number);

    const monthMap: { [key: string]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    return new Date(year, monthMap[monthStr], day, hour, minute, 0);
  };

  // 2. Determine the Current Date object
  let currentDate: Date | null = null;

  if (currentTime instanceof Date) {
    // If it's already a Date object (from getDubaiDate), use it directly
    currentDate = currentTime;
  } else {
    // If it's a string, parse it using the same logic as pickup
    currentDate = parsePickupDate(currentTime);
  }

  const pickupDate = parsePickupDate(pickupTimeStr);

  // Safety checks
  if (!pickupDate || !currentDate || isNaN(pickupDate.getTime()) || isNaN(currentDate.getTime())) {
    return 0;
  }

  // 3. Calculate difference
  const diffMs = pickupDate.getTime() - currentDate.getTime();

  // 4. Handle expired case
  if (diffMs <= 0) {
    return 0; 
  }

  // 5. Return minutes
  return Math.floor(diffMs / (1000 * 60));
};