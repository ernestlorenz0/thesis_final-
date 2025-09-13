import * as ClassicClassroom from '../themes/ClassicClassroom';
import * as STEMModern from '../themes/STEMModern';
import * as PlayfulPrimary from '../themes/PlayfulPrimary';
import * as AcademicMinimal from '../themes/AcademicMinimal';
import * as ScholarlyElegant from '../themes/ScholarlyElegant';
import * as DigitalChalkboard from '../themes/DigitalChalkboard';
import * as ScienceSpectrum from '../themes/ScienceSpectrum';
import * as HistoryHeritage from '../themes/HistoryHeritage';
import * as ArtStudio from '../themes/ArtStudio';
import * as MathMatrix from '../themes/MathMatrix';
import * as LanguageLab from '../themes/LanguageLab';
import * as TechTrends from '../themes/TechTrends';
import * as ResearchReady from '../themes/ResearchReady';
import * as CreativeCanvas from '../themes/CreativeCanvas';
import * as YouthfulYellow from '../themes/YouthfulYellow';
import * as CalmCyan from '../themes/CalmCyan';
import * as ScholarGreen from '../themes/ScholarGreen';
import * as VibrantViolet from '../themes/VibrantViolet';
import * as OrangeOrbit from '../themes/OrangeOrbit';
import * as BlueHorizon from '../themes/BlueHorizon';

export const themeNames = [
  'Classic Classroom',
  'STEM Modern',
  'Playful Primary',
  'Academic Minimal',
  'Scholarly Elegant',
  'Digital Chalkboard',
  'Science Spectrum',
  'History Heritage',
  'Art Studio',
  'Math Matrix',
  'Language Lab',
  'Tech Trends',
  'Research Ready',
  'Creative Canvas',
  'Youthful Yellow',
  'Calm Cyan',
  'Scholar Green',
  'Vibrant Violet',
  'Orange Orbit',
  'Blue Horizon',
];

export const themeComponents = {
  default: AcademicMinimal,
  'Classic Classroom': ClassicClassroom,
  'STEM Modern': STEMModern,
  'Playful Primary': PlayfulPrimary,
  'Academic Minimal': AcademicMinimal,
  'Scholarly Elegant': ScholarlyElegant,
  'Digital Chalkboard': DigitalChalkboard,
  'Science Spectrum': ScienceSpectrum,
  'History Heritage': HistoryHeritage,
  'Art Studio': ArtStudio,
  'Math Matrix': MathMatrix,
  'Language Lab': LanguageLab,
  'Tech Trends': TechTrends,
  'Research Ready': ResearchReady,
  'Creative Canvas': CreativeCanvas,
  'Youthful Yellow': YouthfulYellow,
  'Calm Cyan': CalmCyan,
  'Scholar Green': ScholarGreen,
  'Vibrant Violet': VibrantViolet,
  'Orange Orbit': OrangeOrbit,
  'Blue Horizon': BlueHorizon,
};

export const pptxThemeStyles = {
  default: {
    bgColor: 'FFFFFF',
    title: { fontSize: 36, color: '222222', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '333333', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Classic Classroom': {
    bgColor: 'F8F4E3',
    title: { fontSize: 36, color: '3B2F2F', bold: true, fontFace: 'Arial Black' },
    paragraph: { fontSize: 20, color: '3B2F2F', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'STEM Modern': {
    bgColor: 'E3F6FD',
    title: { fontSize: 36, color: '0D47A1', bold: true, fontFace: 'Calibri' },
    paragraph: { fontSize: 20, color: '1976D2', fontFace: 'Calibri' },
    author: { fontSize: 14, color: '888888', fontFace: 'Calibri' }
  },
  'Playful Primary': {
    bgColor: 'FFF9C4',
    title: { fontSize: 36, color: 'F57C00', bold: true, fontFace: 'Comic Sans MS' },
    paragraph: { fontSize: 20, color: 'F57C00', fontFace: 'Comic Sans MS' },
    author: { fontSize: 14, color: '888888', fontFace: 'Comic Sans MS' }
  },
  'Academic Minimal': {
    bgColor: 'FFFFFF',
    title: { fontSize: 36, color: '222222', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '333333', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Scholarly Elegant': {
    bgColor: 'F3E5F5',
    title: { fontSize: 36, color: '6A1B9A', bold: true, fontFace: 'Georgia' },
    paragraph: { fontSize: 20, color: '6A1B9A', fontFace: 'Georgia' },
    author: { fontSize: 14, color: '888888', fontFace: 'Georgia' }
  },
  'Digital Chalkboard': {
    bgColor: '263238',
    title: { fontSize: 36, color: 'A5D6A7', bold: true, fontFace: 'Courier New' },
    paragraph: { fontSize: 20, color: 'A5D6A7', fontFace: 'Courier New' },
    author: { fontSize: 14, color: 'B0BEC5', fontFace: 'Courier New' }
  },
  'Science Spectrum': {
    bgColor: 'E0F7FA',
    title: { fontSize: 36, color: '0288D1', bold: true, fontFace: 'Trebuchet MS' },
    paragraph: { fontSize: 20, color: '0288D1', fontFace: 'Trebuchet MS' },
    author: { fontSize: 14, color: '888888', fontFace: 'Trebuchet MS' }
  },
  'History Heritage': {
    bgColor: 'FFF8E1',
    title: { fontSize: 36, color: 'BCA678', bold: true, fontFace: 'Times New Roman' },
    paragraph: { fontSize: 20, color: 'BCA678', fontFace: 'Times New Roman' },
    author: { fontSize: 14, color: '888888', fontFace: 'Times New Roman' }
  },
  'Art Studio': {
    bgColor: 'F8BBD0',
    title: { fontSize: 36, color: '6A1B9A', bold: true, fontFace: 'Brush Script MT' },
    paragraph: { fontSize: 20, color: '6A1B9A', fontFace: 'Brush Script MT' },
    author: { fontSize: 14, color: '888888', fontFace: 'Brush Script MT' }
  },
  'Math Matrix': {
    bgColor: 'E3F2FD',
    title: { fontSize: 36, color: '1565C0', bold: true, fontFace: 'Consolas' },
    paragraph: { fontSize: 20, color: '1565C0', fontFace: 'Consolas' },
    author: { fontSize: 14, color: '888888', fontFace: 'Consolas' }
  },
  'Language Lab': {
    bgColor: 'FFE0B2',
    title: { fontSize: 36, color: 'E65100', bold: true, fontFace: 'Verdana' },
    paragraph: { fontSize: 20, color: 'E65100', fontFace: 'Verdana' },
    author: { fontSize: 14, color: '888888', fontFace: 'Verdana' }
  },
  'Tech Trends': {
    bgColor: '263238',
    title: { fontSize: 36, color: '00B8D4', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '00B8D4', fontFace: 'Arial' },
    author: { fontSize: 14, color: 'B0BEC5', fontFace: 'Arial' }
  },
  'Research Ready': {
    bgColor: 'F5F5F5',
    title: { fontSize: 36, color: '263238', bold: true, fontFace: 'Georgia' },
    paragraph: { fontSize: 20, color: '263238', fontFace: 'Georgia' },
    author: { fontSize: 14, color: '888888', fontFace: 'Georgia' }
  },
  'Creative Canvas': {
    bgColor: 'FFFDE7',
    title: { fontSize: 36, color: 'F06292', bold: true, fontFace: 'Comic Sans MS' },
    paragraph: { fontSize: 20, color: 'F06292', fontFace: 'Comic Sans MS' },
    author: { fontSize: 14, color: '888888', fontFace: 'Comic Sans MS' }
  },
  'Youthful Yellow': {
    bgColor: 'FFFDE7',
    title: { fontSize: 36, color: 'FFEB3B', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: 'FBC02D', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Calm Cyan': {
    bgColor: 'E0F7FA',
    title: { fontSize: 36, color: '00ACC1', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '00ACC1', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Scholar Green': {
    bgColor: 'E8F5E9',
    title: { fontSize: 36, color: '388E3C', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '388E3C', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Vibrant Violet': {
    bgColor: 'E1BEE7',
    title: { fontSize: 36, color: '8E24AA', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '8E24AA', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Orange Orbit': {
    bgColor: 'FFE0B2',
    title: { fontSize: 36, color: 'FF6F00', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: 'FF6F00', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
  'Blue Horizon': {
    bgColor: 'E3F2FD',
    title: { fontSize: 36, color: '1976D2', bold: true, fontFace: 'Arial' },
    paragraph: { fontSize: 20, color: '1976D2', fontFace: 'Arial' },
    author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
  },
};
